const getPlants = require("../routes/Plants/Plants.js");

describe("getPlants", () => {
  it("should return an array of plants", async () => {
    const req = { body: { UserId: "pKdei1diVI4PjZFbWTLT" } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getPlants(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "plants found",
      status: "200 OK",
      plants: [],
    });
    expect(res.status).toThrow(404)
  });
});
