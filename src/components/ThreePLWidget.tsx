import { motion } from 'framer-motion';
import { TruckIcon, BuildingStorefrontIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Manufacturing',
    description: 'Your business orders/makes products',
    icon: <BuildingStorefrontIcon className="w-8 h-8" />,
  },
  {
    title: 'Warehouse Reception',
    description: 'Products shipped to 3PL warehouse',
    icon: <TruckIcon className="w-8 h-8" />,
  },
  {
    title: 'Inventory Management',
    description: 'Inventory warehoused and managed by 3PL',
    icon: <BuildingStorefrontIcon className="w-8 h-8" />,
  },
  {
    title: 'Order Processing',
    description: 'Orders received and processed',
    icon: <GlobeAltIcon className="w-8 h-8" />,
  },
  {
    title: 'Fulfillment',
    description: 'Orders picked, packed and shipped',
    icon: <TruckIcon className="w-8 h-8" />,
  },
];

export default function ThreePLWidget() {
  return (
    <div className="bg-[#001524] text-white p-8 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#00A7E1]">
        How Third-Party Logistics (3PL) Works
      </h2>
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-center gap-4 bg-opacity-20 bg-white p-4 rounded-lg hover:bg-opacity-30 transition-all"
          >
            <div className="bg-[#00A7E1] p-3 rounded-full">
              {step.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#00A7E1]">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-8 text-center text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p>Streamline your logistics with professional 3PL services</p>
      </motion.div>
    </div>
  );
}
