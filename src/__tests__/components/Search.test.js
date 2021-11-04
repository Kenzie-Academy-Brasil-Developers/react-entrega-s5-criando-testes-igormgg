import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../../components/Search";
// import userEvent from "@testing-library/user-event";
// import Address from "../../components/Cep";
import api from "../../services/index";
import MockAdapter from "axios-mock-adapter";
import Providers from "../../providers";

const apiMock = new MockAdapter(api);

describe("Search component", () => {
  ///// TESTES UNITÁRIOS //////

  test("Should render Search input", () => {
    render(<Search />);

    expect(screen.getByPlaceholderText("Insira o CEP")).toBeTruthy();
  });

  it("Should not let the user be able to click on the button when the input value is empty", () => {
    render(<Search />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  /////// TESTE DE INTEGRAÇÃO ///////

  test("Should write on input and click on button", async () => {
    apiMock.onGet(api).replyOnce(200, {});
    render(
      <Providers>
        <Search />
      </Providers>
    );

    const inputField = screen.getByPlaceholderText("Insira o CEP");
    const buttonElement = screen.getByText("Buscar pelo CEP");

    fireEvent.change(inputField, { target: { value: 71936250 } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(inputField).toHaveValue(71936250);
    });
  });
});
