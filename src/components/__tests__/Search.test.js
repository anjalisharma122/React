import { render ,screen ,fireEvent} from "@testing-library/react";
import Body from "../Body";
import {act} from "react";
import { BrowserRouter } from "react-router-dom";
import MOCK_DATA from "../mocks/mockResListData.json";
import "@testing-library/react";


global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json :()=>{
            return Promise.resolve(MOCK_DATA);
        }
    })
})



test("Should search resList for burger text input" ,async()=>{
    await act(async()=>render(
        <BrowserRouter>
            <Body />

        </BrowserRouter>
    )
);
    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(20);

        const searchBtn =screen.getByRole("button" , {name:"Search"});
        
        const searchInput =screen.getByTestId("searchInput");

        fireEvent.change(searchInput ,{target:{value: "burger"}});
        fireEvent.click(searchBtn);

        const cardsAfterSearch =screen.getAllByTestId("resCard");
        expect(cardsAfterSearch.length).toBe(2);

        expect(searchBtn).toBeInTheDocument();
});

test("Should filter top rated restaurant" ,async()=>{
    await act(async()=>render(
        <BrowserRouter>
            <Body />

        </BrowserRouter>
    )
);
    const cardsBeforeFilter = screen.getAllByTestId("resCard");
    expect(cardsBeforeFilter.length).toBe(20);

    const topRatedBtn =screen.getByRole("button" ,{name: "Top Rated Restaurants"});
    fireEvent.click(topRatedBtn);

    const cardsAfterFilter = screen.getAllByTestId("resCard");
    expect(cardsAfterFilter.length).toBe(4);




})