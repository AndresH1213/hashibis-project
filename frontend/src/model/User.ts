export interface UserSignup {
  username: string;
  password: string;
  email?: string;
}

export interface UserAttribute {
  Name: string;
  Value: string;
}

export interface Space {
  spaceId: string;
  name: string;
  location: string;
  photoURL?: string;
}
