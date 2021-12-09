export interface IUserProfile {
  avatar: string;
  signature?: string;
  matricNumber: string;
  fullName: string;
  session: string;
  faculty: string;
  department: string;
  course: string;
  level: string;
  gender: string;
  address: string;
  studentEmail: string;
  phoneNumber: string;
  modeOfEntry: string;
  studentShipStatus: string;
  chargesPaid: string;
  dateOfBirth: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  levelAdviser: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  nextOfKin: {
    fullName: string;
    address: string;
    relationship: string;
    phoneNumber: string;
    email: string;
  };
  guardian: {
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
  };
  sponsor: {
    fullName?: string;
    address: string;
    phoneNumber: string;
    email: string;
  };
  semester: {
    type: string;
    number: string;
    year: string;
  };
}
