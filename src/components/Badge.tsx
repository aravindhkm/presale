import React from 'react';

type BudgeType = 'blocChane' | 'informer';
type BudgeBlocChaneVariant = 'BEP' | 'ERC' | 'TRC';
type BudgeInformerVariant = 'Live' | 'DeFi' | 'Metaverse' | 'Investment' | 'GameFi' | 'Approved' | 'Finished';

type BudgeProps = {
  type: BudgeType;
  blocChaneVariant: BudgeBlocChaneVariant;
  informerVariant: BudgeInformerVariant;
};

export const Budge: React.FC<BudgeProps> = () => {
  return null;
  // if (type === 'blocChane') {
  //   switch (blocChaneVariant) {
  //     case 'BEP':
  //       return <div>123</div>;
  //   }
  // }
  // if (type === 'informer') {
  //   switch (informerVariant) {
  //     case
  //   }
};
