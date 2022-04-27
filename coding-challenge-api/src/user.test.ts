import { getUser } from "./user";
import { handleOrders } from "./sales";

test("getUser returns user details", () => {
  const res = {
    json: jest.fn(),
  };
  getUser(null, res);
  expect(res.json).toHaveBeenCalledWith({
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@email.com",
    id: 1,
  });
});

test("handleOrders wiht null req should not fail", () => {
  const res = {
    json: jest.fn(),
  };

  expect(() => {
    handleOrders(null, res);
  });
});
