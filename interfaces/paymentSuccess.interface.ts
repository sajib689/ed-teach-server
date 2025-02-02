export interface IPayment {
  tran_id: string;
  courseName: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  total_amount: number;
  status: string; 
  createdAt?: Date;
  updatedAt?: Date;
}
