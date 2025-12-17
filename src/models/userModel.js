import bcrypt from "bcryptjs";

export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Sign up
  static async SignUp(name, email, password) {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      hashedPassword
    );
    users.push(newUser);
    // Return user without the password
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }

  // Sign in

  static async SignIn(email, password) {
    const user = users.find((user) => user.email == email);
    if (!user) {
      return null;
    }
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  }

  // Get all users
  static getAllUsers() {
    return users;
  }

  // Find user by email
  static findByEmail(email) {
    return users.find((user) => user.email === email);
  }

  // Find user by ID
  static findById(id) {
    return users.find((user) => user.id == id);
  }
}

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "$2a$12$2Uf.o2.j5zJ.E/p.5.C1A.eS3g5.z.C1A.eS3g5.z.C1A.eS3g5.z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    password: "$2a$12$9yG.eS3g5.z.C1A.eS3g5.z.C1A.eS3g5.z.C1A.eS3g5.z.C1A",
  },
];
