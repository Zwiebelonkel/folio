"use client";

import type { Skill } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SkillsProps {
  skills: Skill[];
}

const chartConfig = {
  level: {
    label: "Level",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function Skills({ skills }: SkillsProps) {

  const chartData = skills.map(skill => ({
    subject: skill.name,
    level: skill.level,
    fullMark: 100,
  }));

  return (
    <section className="py-8 sm:py-10">
       <Card className="max-w-2xl mx-auto liquid-glass border-white/5">
         <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardHeader className="p-0 flex-1">
                  <CardTitle className="text-xl font-bold text-center font-headline tracking-tight">Technical Proficiency</CardTitle>
                </CardHeader>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="px-6 pb-6 pt-0">
                  <Tabs defaultValue="bar" className="w-full">
                    <div className="flex justify-center mb-4">
                      <TabsList className="bg-background/50 h-8">
                        <TabsTrigger value="radar" className="text-xs px-4 h-6">Radar</TabsTrigger>
                        <TabsTrigger value="bar" className="text-xs px-4 h-6">Bar</TabsTrigger>
                      </TabsList>
                    </div>
                    <div className="mx-auto w-full">
                      <TabsContent value="radar" className="h-full mt-0">
                        <div className="h-[220px]">
                          <ChartContainer
                            config={chartConfig}
                            className="w-full h-full aspect-auto"
                          >
                            <ResponsiveContainer>
                              <RadarChart 
                                data={chartData}
                                margin={{
                                  top: 10,
                                  right: 10,
                                  bottom: 10,
                                  left: 10,
                                }}
                              >
                                <ChartTooltip
                                  cursor={false}
                                  content={<ChartTooltipContent indicator="dot" />}
                                />
                                <PolarGrid strokeOpacity={0.1} />
                                <PolarAngleAxis 
                                  dataKey="subject" 
                                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
                                />
                                <PolarRadiusAxis 
                                  angle={90} 
                                  domain={[0, 100]} 
                                  tick={false} 
                                  axisLine={false} 
                                />
                                <Radar 
                                  name="Proficiency" 
                                  dataKey="level" 
                                  stroke="hsl(var(--primary))" 
                                  fill="hsl(var(--primary))" 
                                  fillOpacity={0.5} 
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </TabsContent>
                      <TabsContent value="bar" className="h-full mt-0">
                        <div className="h-[220px]">
                           <ChartContainer
                             config={chartConfig}
                             className="w-full h-full aspect-auto"
                           >
                              <ResponsiveContainer>
                                <BarChart data={chartData} layout="vertical" margin={{ left: 5, right: 30, top: 0, bottom: 0 }}>
                                  <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                  />
                                  <XAxis type="number" domain={[0, 100]} hide />
                                  <YAxis 
                                    dataKey="subject" 
                                    type="category" 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                                    width={70}
                                  />
                                  <Bar dataKey="level" fill="hsl(var(--primary))" radius={[0, 2, 2, 0]} barSize={12} />
                                </BarChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                         </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
         </Accordion>
      </Card>
    </section>
  );
}