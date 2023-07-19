export const accountStatus = {
    getAccountStatusData() {
        return [
            {
                id: '1000',
                data: 'Opened 16 February 2023 16:30 ',
                type:'SWIFT',
                name: 'Bohoslovskyi Andrii',
                status:'Rejected',
            },
        ];
    },
  
  
    getAccountStatusMini() {
        return Promise.resolve(this.getAccountStatusData().slice(0, 1));
    },
  };
  