export const buySell = {
    getBuySellData() {
        return [
            {
                id: '1000',
                type: 'EMI account opening',
                typeMore: null,
                price: 900.00,
                description: 'EMI account opening in differe',
                historyTransaction: '10 work days',
                serviceTime: 123000,
                descriptionMore: 'test0',
            },
            {
                id: '1001',
                type: 'EU trademark registration',
                typeMore: 'test Type 0',
                price: 420.00,
                description: 'EMI account opening in differe',
                historyTransaction: '7 work days',
                serviceTime: 100000,
                descriptionMore: 'test1',
  
            },
            {
                id: '1002',
                type: 'Legal Counsel-as-a Service',
                typeMore: 'test Type 0',
                price: 600.00,
                description: 'subscription service/ 10 hours',
                historyTransaction: '',
                serviceTime: 1000,
                descriptionMore: null
         
            },
            {
                id: '1003',
                type: 'Package of agreements for IT o',
                typeMore: 'test Type 0',
                price: 1800.00,
                description: 'MSA + SOW (t&m, fixed price, d',
                historyTransaction: '5 work days',
                serviceTime: 1000,
                descriptionMore: null
             
            },
            {
                id: '1004',
                type: 'GDPR product compliance',
                typeMore: null,
                price: 1200.00,
                description: 'website app check and recomme',
                historyTransaction: '10 work days',
                serviceTime: 1000,
                descriptionMore: null
         
            },
            {
                id: '1005',
                type: 'Data Processina Agreement',
                  typeMore: null,
                price: 480.00,
                description: 'website app check and recomme',
                historyTransaction: '10 work days',
                serviceTime: 1000,
                descriptionMore: null
       
            },
        ];
    },
  
  
    getBuySellMini() {
        return Promise.resolve(this.getBuySellData().slice(0, 6));
    },
  };
  