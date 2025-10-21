
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
    <section className="py-12 sm:py-16">
       <Card className="max-w-4xl mx-auto">
         <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="p-6 hover:no-underline">
                <CardHeader className="p-0 flex-1">
                  <CardTitle className="text-3xl font-bold text-center font-headline">My Skills</CardTitle>
                </CardHeader>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="p-6 pt-0">
                  <Tabs defaultValue="radar" className="w-full">
                    <div className="flex justify-center">
                      <TabsList>
                        <TabsTrigger value="radar">Radar</TabsTrigger>
                        <TabsTrigger value="bar">Bar</TabsTrigger>
                      </TabsList>
                    </div>
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square max-h-[400px] mt-4"
                    >
                      <TabsContent value="radar">
                        <ResponsiveContainer>
                          <RadarChart 
                            data={chartData}
                            margin={{
                              top: 20,
                              right: 20,
                              bottom: 20,
                              left: 20,
                            }}
                          >
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="dot" />}
                            />
                            <PolarGrid />
                            <PolarAngleAxis 
                              dataKey="subject" 
                              tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }} 
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
                              fillOpacity={0.6} 
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      <TabsContent value="bar">
                         <ResponsiveContainer>
                            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 40 }}>
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
                                tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }}
                                width={80}
                              />
                              <Bar dataKey="level" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                      </TabsContent>
                    </ChartContainer>
                  </Tabs>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
         </Accordion>
      </Card>
    </section>
  );
}

