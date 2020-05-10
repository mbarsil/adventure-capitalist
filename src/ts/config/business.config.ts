import { BaseBusiness } from '../classes/BaseBusiness';
import { ConvenienceStoreBusiness } from '../classes/ConvenienceStoreBusiness';
import { TechBusiness } from '../classes/TechBusiness';
import { PawnShopBusiness } from '../classes/PawnShopBusiness';
import { CarDealershipBusiness } from '../classes/CarDealershipBusiness';
import { ConstructionBusiness } from '../classes/ConstructionBusiness';
import { WayneIndustriesBusiness } from '../classes/WayneIndustriesBusiness';

export interface BusinessInfo {
  model: typeof BaseBusiness;
  name: string;
  price: number;
  profit: number;
  interval: number;
  managerPrice: number;
  upgradePrice: number;
  logo: string;
}

export interface BusinessOperation {
  operationName: string;
  logo: string;
}

export const STARTING_MONEY = 400 ;
export const UPGRADE_PROFIT_MULTIPLIER = 1.25;
export const UPGRADE_PRICE_MULTIPLIER = 1.5;
export const ACQUIRING_MULTIPLIER = 1.25;

export const BUSINESS_INFO: BusinessInfo[] = [
  {
    model: ConvenienceStoreBusiness,
    name: 'Convenience Store',
    price: 100,
    profit: 85,
    interval: 1000,
    managerPrice: 500,
    upgradePrice: 500,
    logo: 'convenience-store'
  },
  {
    model: PawnShopBusiness,
    name: 'Pawn Shop',
    price: 500,
    profit: 450,
    interval: 5000,
    managerPrice: 2000,
    upgradePrice: 2000,
    logo: 'pawn-shop'
  },
  {
    model: CarDealershipBusiness,
    name: 'Car Dealership',
    price: 2000,
    profit: 1700,
    interval: 30000,
    managerPrice: 5000,
    upgradePrice: 5000,
    logo: 'car-dealership'
  },
  {
    model: ConstructionBusiness,
    name: 'Construction Company',
    price: 50000,
    profit: 45000,
    interval: 60000,
    managerPrice: 10000,
    upgradePrice: 1000,
    logo: 'construction'
  },
  {
    model: TechBusiness,
    name: 'Tech Hub',
    price: 1000000,
    profit: 800000,
    interval: 120000,
    managerPrice: 2000000,
    upgradePrice: 2000000,
    logo: 'tech'
  },
  {
    model: WayneIndustriesBusiness,
    name: 'Wayne Enterprises',
    price: 50000000,
    profit: 40000000,
    interval: 12000,
    managerPrice: 100000000,
    upgradePrice: 100000000,
    logo: 'wayne-enterprises'
  },
];

/**
 * Array of definitions for business operations
 * Currently operationName must match the BusinessOperation interface props
 * Check improvements on README.md
 */
export const BUSINESS_OPERATIONS: BusinessOperation[] = [
  {
    operationName: 'acquire',
    logo: 'buy'
  },
  {
    operationName: 'upgrade',
    logo: 'upgrade'
  },
  {
    operationName: 'hireManager',
    logo: 'manager'
  }
];
