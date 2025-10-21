
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
} from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center font-headline">My Skills</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[400px]"
              >
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
            </ChartContainer>
          </CardContent>
      </Card>
    </section>
  );
}
