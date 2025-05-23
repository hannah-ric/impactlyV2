// src/components/D3MaterialityMatrix.tsx

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Download,
  Maximize2,
  Minimize2,
  Info,
  Filter,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import * as d3 from "d3";
import {
  MaterialityItem,
  MaterialityCategory,
  MaterialityMatrixConfig,
  MaterialityMatrixQuadrant,
  MaterialityFilter,
} from "@/types/materiality";
import { cn } from "@/lib/utils";

interface D3MaterialityMatrixProps {
  items: MaterialityItem[];
  onItemSelect: (item: MaterialityItem) => void;
  onItemUpdate?: (item: MaterialityItem) => void;
  onItemDelete?: (itemId: string) => void;
  onAddNew?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
  editable?: boolean;
  className?: string;
  enableFiltering?: boolean;
  enableZoom?: boolean;
  enableTooltips?: boolean;
  autoResize?: boolean;
}

const defaultConfig: MaterialityMatrixConfig = {
  width: 800,
  height: 600,
  margin: { top: 40, right: 40, bottom: 60, left: 60 },
  quadrants: [
    {
      label: "Monitor",
      description: "Low business and stakeholder impact",
      color: "#f3f4f6",
      minX: 0,
      maxX: 2.5,
      minY: 0,
      maxY: 2.5,
    },
    {
      label: "Manage",
      description: "High business impact, low stakeholder impact",
      color: "#fef3c7",
      minX: 2.5,
      maxX: 5,
      minY: 0,
      maxY: 2.5,
    },
    {
      label: "Engage",
      description: "Low business impact, high stakeholder impact",
      color: "#dbeafe",
      minX: 0,
      maxX: 2.5,
      minY: 2.5,
      maxY: 5,
    },
    {
      label: "Prioritize",
      description: "High business and stakeholder impact",
      color: "#dcfce7",
      minX: 2.5,
      maxX: 5,
      minY: 2.5,
      maxY: 5,
    },
  ],
  thresholds: {
    x: 2.5,
    y: 2.5,
  },
};

const categoryColors: Record<MaterialityCategory, string> = {
  [MaterialityCategory.ENVIRONMENTAL]: "#10b981",
  [MaterialityCategory.SOCIAL]: "#3b82f6",
  [MaterialityCategory.GOVERNANCE]: "#8b5cf6",
  [MaterialityCategory.ECONOMIC]: "#f59e0b",
};

export const D3MaterialityMatrix: React.FC<D3MaterialityMatrixProps> = ({
  items,
  onItemSelect,
  onItemUpdate,
  onItemDelete,
  onAddNew,
  onExport,
  isLoading = false,
  editable = true,
  className,
  enableFiltering = true,
  enableZoom = true,
  enableTooltips = true,
  autoResize = true,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const [selectedItem, setSelectedItem] = useState<MaterialityItem | null>(
    null,
  );
  const [hoveredItem, setHoveredItem] = useState<MaterialityItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [showLegend, setShowLegend] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filter, setFilter] = useState<MaterialityFilter>({
    categories: [],
    searchTerm: "",
  });

  // Filter items based on current filter state
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (filter.categories && filter.categories.length > 0) {
        if (!filter.categories.includes(item.category)) {
          return false;
        }
      }

      // Search filter
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [items, filter]);

  // Update dimensions on resize
  useEffect(() => {
    if (!autoResize) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = isFullscreen ? window.innerHeight - 200 : 600;
        setDimensions({
          width: Math.max(600, width - 40),
          height,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isFullscreen, autoResize]);

  // Zoom functions
  const handleZoomIn = () => {
    if (zoomRef.current && svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.transition().duration(300).call(zoomRef.current.scaleBy, 1.5);
    }
  };

  const handleZoomOut = () => {
    if (zoomRef.current && svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg
        .transition()
        .duration(300)
        .call(zoomRef.current.scaleBy, 1 / 1.5);
    }
  };

  const handleResetZoom = () => {
    if (zoomRef.current && svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg
        .transition()
        .duration(500)
        .call(zoomRef.current.transform, d3.zoomIdentity);
      setZoomLevel(1);
    }
  };

  // D3 visualization
  useEffect(() => {
    if (!svgRef.current || isLoading) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const { margin } = defaultConfig;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear().domain([0, 5]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 5]).range([innerHeight, 0]);

    // Create main group
    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add zoom behavior if enabled
    if (enableZoom) {
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 5])
        .on("zoom", (event) => {
          g.attr(
            "transform",
            `translate(${margin.left},${margin.top}) ${event.transform}`,
          );
          setZoomLevel(event.transform.k);
        });

      svg.call(zoom);
      zoomRef.current = zoom;
    }

    // Draw quadrants
    defaultConfig.quadrants.forEach((quadrant) => {
      g.append("rect")
        .attr("x", xScale(quadrant.minX))
        .attr("y", yScale(quadrant.maxY))
        .attr("width", xScale(quadrant.maxX - quadrant.minX))
        .attr("height", yScale(quadrant.maxY - quadrant.minY))
        .attr("fill", quadrant.color)
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 1);

      // Add quadrant labels
      g.append("text")
        .attr("x", xScale((quadrant.minX + quadrant.maxX) / 2))
        .attr("y", yScale((quadrant.minY + quadrant.maxY) / 2))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#6b7280")
        .attr("font-size", "14px")
        .attr("font-weight", "500")
        .text(quadrant.label.toUpperCase())
        .style("opacity", 0.5);
    });

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-innerHeight)
          .tickFormat(() => "")
          .ticks(5),
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.3);

    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => "")
          .ticks(5),
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.3);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Business Impact →");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -innerHeight / 2)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Stakeholder Impact →");

    // Create tooltip if enabled
    let tooltip: d3.Selection<
      HTMLDivElement,
      unknown,
      HTMLElement,
      any
    > | null = null;
    if (enableTooltips) {
      tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "materiality-tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background", "rgba(0, 0, 0, 0.9)")
        .style("color", "white")
        .style("padding", "12px 16px")
        .style("border-radius", "8px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", "1000")
        .style("box-shadow", "0 4px 12px rgba(0,0,0,0.15)")
        .style("backdrop-filter", "blur(4px)");
    }

    // Plot items
    const itemGroups = g
      .selectAll(".item-group")
      .data(filteredItems)
      .enter()
      .append("g")
      .attr("class", "item-group")
      .attr(
        "transform",
        (d) =>
          `translate(${xScale(d.businessImpact)}, ${yScale(d.stakeholderImpact)})`,
      )
      .style("cursor", "pointer");

    // Add circles for items
    itemGroups
      .append("circle")
      .attr("r", 8)
      .attr("fill", (d) => categoryColors[d.category])
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
      .style("transition", "all 0.2s ease")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 12)
          .attr("stroke-width", 3);

        setHoveredItem(d);

        if (enableTooltips && tooltip) {
          tooltip.transition().duration(200).style("opacity", 0.95);

          tooltip
            .html(
              `
            <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">${d.name}</div>
            <div style="font-size: 11px; line-height: 1.4;">
              <div style="margin-bottom: 4px;"><strong>Category:</strong> ${d.category}</div>
              <div style="margin-bottom: 4px;"><strong>Business Impact:</strong> ${d.businessImpact}/5</div>
              <div style="margin-bottom: 4px;"><strong>Stakeholder Impact:</strong> ${d.stakeholderImpact}/5</div>
              <div style="margin-bottom: 4px;"><strong>Priority:</strong> ${d.priority}</div>
              <div style="margin-top: 8px; font-style: italic; opacity: 0.9;">${d.description}</div>
            </div>
          `,
            )
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY - 10 + "px");
        }
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .attr("stroke-width", 2);

        setHoveredItem(null);

        if (enableTooltips && tooltip) {
          tooltip.transition().duration(300).style("opacity", 0);
        }
      })
      .on("click", function (event, d) {
        event.stopPropagation();
        setSelectedItem(d);
        onItemSelect(d);
      });

    // Add item labels for better visibility
    itemGroups
      .append("text")
      .attr("dy", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "500")
      .style("fill", "#374151")
      .style("pointer-events", "none")
      .text((d) =>
        d.name.length > 12 ? d.name.substring(0, 12) + "..." : d.name,
      );

    // Cleanup tooltip on unmount
    return () => {
      d3.select("body").selectAll(".materiality-tooltip").remove();
    };
  }, [
    filteredItems,
    dimensions,
    isLoading,
    onItemSelect,
    enableZoom,
    enableTooltips,
  ]);

  if (isLoading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>Materiality Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[600px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle>Materiality Matrix</CardTitle>
              <Badge variant="secondary">
                {filteredItems.length} of {items.length} items
              </Badge>
              {enableZoom && (
                <Badge variant="outline">
                  Zoom: {Math.round(zoomLevel * 100)}%
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {enableFiltering && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              )}
              {enableZoom && (
                <>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleResetZoom}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </>
              )}
              {editable && (
                <>
                  {onAddNew && (
                    <Button variant="outline" size="sm" onClick={onAddNew}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  )}
                  {onExport && (
                    <Button variant="outline" size="sm" onClick={onExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  )}
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLegend(!showLegend)}
              >
                <Info className="h-4 w-4 mr-2" />
                {showLegend ? "Hide" : "Show"} Legend
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters Panel */}
          {enableFiltering && showFilters && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Filters</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter({ categories: [], searchTerm: "" })}
                >
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm font-medium">
                    Search Topics
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name or description..."
                      value={filter.searchTerm || ""}
                      onChange={(e) =>
                        setFilter((prev) => ({
                          ...prev,
                          searchTerm: e.target.value,
                        }))
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Categories</Label>
                  <div className="space-y-2">
                    {Object.entries(categoryColors).map(([category, color]) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={
                            filter.categories?.includes(
                              category as MaterialityCategory,
                            ) || false
                          }
                          onCheckedChange={(checked) => {
                            setFilter((prev) => ({
                              ...prev,
                              categories: checked
                                ? [
                                    ...(prev.categories || []),
                                    category as MaterialityCategory,
                                  ]
                                : (prev.categories || []).filter(
                                    (c) => c !== category,
                                  ),
                            }));
                          }}
                        />
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <Label
                          htmlFor={category}
                          className="text-xs capitalize cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={containerRef} className="relative">
            <svg ref={svgRef} className="w-full" />

            {showLegend && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border space-y-3 max-w-xs">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Categories</h4>
                  {Object.entries(categoryColors).map(([category, color]) => (
                    <div key={category} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs capitalize">{category}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Quadrants</h4>
                  {defaultConfig.quadrants.map((quadrant) => (
                    <div key={quadrant.label} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: quadrant.color }}
                        />
                        <span className="text-xs font-medium">
                          {quadrant.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 ml-5">
                        {quadrant.description}
                      </p>
                    </div>
                  ))}
                </div>

                {enableZoom && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Controls</h4>
                      <p className="text-xs text-gray-600">
                        Scroll to zoom, drag to pan
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
            <DialogDescription>{selectedItem?.description}</DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Category:</span>
                  <Badge
                    variant="outline"
                    className="ml-2"
                    style={{
                      borderColor: categoryColors[selectedItem.category],
                      color: categoryColors[selectedItem.category],
                    }}
                  >
                    {selectedItem.category}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Priority:</span>
                  <Badge variant="secondary" className="ml-2">
                    {selectedItem.priority}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Business Impact:</span>
                  <span className="ml-2">{selectedItem.businessImpact}/5</span>
                </div>
                <div>
                  <span className="font-medium">Stakeholder Impact:</span>
                  <span className="ml-2">
                    {selectedItem.stakeholderImpact}/5
                  </span>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge variant="outline" className="ml-2">
                    {selectedItem.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span>
                  <span className="ml-2">
                    {new Date(selectedItem.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {editable && (
                <div className="flex justify-end space-x-2 pt-4">
                  {onItemDelete && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onItemDelete(selectedItem.id);
                        setSelectedItem(null);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  {onItemUpdate && (
                    <Button
                      size="sm"
                      onClick={() => {
                        onItemUpdate(selectedItem);
                        setSelectedItem(null);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
