//INTERFACE RESPONSAVE PELO MODELO DE EMPLOYEE PARA RECEBER DADOS TIPADOS RETORNADOS DA API
export interface IEmployee {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  cpf: string;
  phone: string;
  validated: string | null;

}
