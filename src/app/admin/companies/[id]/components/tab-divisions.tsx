'use client'

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Company } from "@/lib/interfaces/company-interfaces";
import { Separator } from "@radix-ui/react-separator";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { DivisionAddNewButton } from "./division-add-new-button";
import { DivisionList } from "./division-list";
import { Input } from "@/components/ui/input";
import { TabDivisionReports } from "./tab-division-report";
import { Division } from "@/lib/interfaces/division-interfaces";

interface TabDivisionsProps {
  company: Company;
}

export const TabDivisions: React.FC<TabDivisionsProps> = ({ company }) => {
  const [searchString, setSearchString] = useState('')
  const [selectedDivsion, setSelectedDivsion] = useState<Division | undefined>(undefined)

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-full max-h-full max-w-full rounded"
      >
        <ResizablePanel
          defaultSize={40}
        >
          <div >
            <div className="flex justify-between px-4 py-2">
              <h1 className="text-lg font-bold">Divisions</h1>
              {company && <DivisionAddNewButton company={company} />}
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                </div>
              </form>
            </div>
            <DivisionList company={company} searchString={searchString} onSelectDivision={(di) => setSelectedDivsion(di)} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <div>
            <div className="flex h-full px-4 py-2">
              {selectedDivsion && <span className="text-lg font-bold">Reports of {selectedDivsion?.name}</span>}
              {
                !selectedDivsion &&
                <div className="flex flex-col justify-between">
                  <span className="text-lg font-bold">Reports</span>
                  <span className="text-sm text-muted-foreground m-6 pt-10">Select one of division for loading assigned reports </span>
                </div>
              }
            </div>
            <Separator />
            {
              selectedDivsion &&
              <TabDivisionReports company={company} division={selectedDivsion as Division}></TabDivisionReports>
            }
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )

}