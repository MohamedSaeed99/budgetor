import { useMutation, useQuery } from "@tanstack/react-query";
import { addSection, deleteSection, getSections, updateSection } from "./SectionAPI";
import type { Section } from "../../models/Section.model";

const SectionAPI = {
    GetSections: {
        useQuery: () => 
            useQuery({
                queryKey: ['sections'],
                queryFn: getSections,
            })
    },
    AddSection: {
        useMutation: () =>
            useMutation({
                mutationFn: (section: Section) => addSection(section),
            })
    },
    UpdateSection: {
        useMutation: () =>
            useMutation({
                mutationFn: (section: Section) => updateSection(section),
            })
    },
    DeleteSection: {
        useMutation: () =>
            useMutation({
                mutationFn: (sectionId: string) => deleteSection(sectionId),
            })
    }
}

export default SectionAPI;