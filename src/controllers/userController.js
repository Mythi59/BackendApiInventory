import { User } from "../models/userModel.js";

export async function createNewUser(request, response) {
  try {
    const { name, email, password, role } = request.body;
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });
    return response.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Error creating user" });
  }
}

export async function getUserById(request, response) {
  try {
    const { id } = request.body;
    const user = await User.findByPk(id);
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    return response.status(200).json(user);
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Error retrieving user" });
  }
}

export async function updateUser(request, response) {
  try {
    const { id, name, email, password, role } = request.body;
    const [updated] = await User.update(
      {
        name,
        email,
        password,
        role,
      },
      {
        where: { id: id },
      }
    );
    if (updated === 0) {
      return response.status(404).json({ message: "User not found" });
    }
    return response.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Error updating user" });
  }
}
