import { User } from "../models/userModel.js";

/**
 * @api {post} /api/users/create Create A New User
 * @apiName CreateNewUser
 * @apiGroup User
 *
 * @apiParamsExample {json} Request-Example:
 *    {
 *      "name": "Admin Principal",
 *      "email": "admin@test.com",
 *      "password": "admin123",
 *      "role": "admin"
 *    }
 *
 * @apiSuccess {Number} id User id autoincremented primary key
 * @apiSuccess {String} name User name
 * @apiSuccess {String} email Email email
 * @apiSuccess {String} password Password password
 * @apiSuccess {String} role Role of the User role
 * @apiSuccess {Date} createdAt Creation Date of the User createdAt
 * @apiSuccess {Date} updatedAt Last Update Date of the User updateAt
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *        "id": 1,
 *        "name": "John Doe",
 *        "email": "john@correo.com",
 *        "password": "password123",
 *        "role": "admin",
 *        "createdAt": "2023-10-01T12:00:00.000Z",
 *        "updatedAt": "2023-10-01T12:00:00.000Z"
 *      }
 */

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

/**
 * @api {get} /inventory/user Get User By Id
 * @apiName GetUserById
 * @apiGroup User
 *
 * @apiParams {Number} id User id
 * @apiParamsExample Request-Example:
 * {
 *   "id": 1
 * }
 *
 * @apiSuccess {Number} id User id autoincremented primary key
 * @apiSuccess {String} name User name
 * @apiSuccess {String} email Email email
 * @apiSuccess {String} password Password password
 * @apiSuccess {String} role Role of the User role
 * @apiSuccess {Date} createdAt Creation Date of the User createdAt
 * @apiSuccess {Date} updatedAt Last Update Date of the User updateAt
 *
 * @apiSuccessExample Success-Response:
 *    Http/1.1 200 OK
 *    {
 *       "id": 1,
 *       "name": "Admin Actualizado",
 *       "email": "admin@test.com",
 *       "password": "admin123",
 *       "role": "admin",
 *       "createdAt": "2025-10-25T14:43:12.000Z",
 *       "updatedAt": "2025-10-25T14:45:43.000Z"
 *    }
 */

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

/**
 * @api {put} /inventory/user/update Update User By Id
 * @apiName UpdateUserById
 * @apiGroup User
 *
 * @apiParamsExample {json} Request-Example:
 *    {
 *      "id": 1,
 *      "name": "Admin Actualizado",
 *      "email": "admin@test.com",
 *      "password": "admin123",
 *      "role": "admin"
 *    }
 *
 * @apiSuccess {String} message Success message
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "User updated successfully"
 *    }
 */

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
