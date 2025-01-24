export interface IPayment {
    tran_id: string;
    amount: number;
    status: string;
    customer: {
      name: string;
      email: string;
      phone: string;
      address?: string;
      city?: string;
      country?: string;
    };
    courseName: string;
    createdAt: Date;
  }