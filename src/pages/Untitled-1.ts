import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("axios", () => {
  it("should allow mocked calls", async () => {
    const mockData = {
      users: [{ id: 1, name: "John Smith" }]
    };
    mock.onGet("/users").reply(200, mockData);

    const { data } = await axios.get("/users");
    expect(data).toEqual(mockData);
  });
});