import React, { SVGProps } from 'react';

interface FeMorphologyProps extends SVGProps<SVGFEMorphologyElement> {
    operator?: string;
    radius?: string;
    in?: string;
    result?: string;
  }
  
  interface FeGaussianBlurProps extends SVGProps<SVGFEGaussianBlurElement> {
    stdDeviation?: string;
    in?: string;
    result?: string;
  }
  
  interface FeFloodProps extends SVGProps<SVGFEFloodElement> {
    floodColor?: string;
    result?: string;
  }
  
  interface FeCompositeProps extends SVGProps<SVGFECompositeElement> {
    in?: string;
    in2?: string;
    operator?: string;
    result?: string;
  }

  
interface FeMergeProps extends SVGProps<SVGFEMergeElement> {}

interface FeMergeNodeProps extends SVGProps<SVGFEMergeNodeElement> {
  in?: string;
}

export interface SAMBlockColorFilterProps {
  id: string;
  color?: { r: number; g: number; b: number };
  
}