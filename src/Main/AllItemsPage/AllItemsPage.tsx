import FilterCategory from "./FilterCategory/FilterCategory";
import Item from "./Item/Item";

import "./AllItemsPage.css";

import { useReducer, useRef, useState } from "react";
import Pagination from "@mui/material/Pagination";

import usePagination from "../../hooks/Pagination";
import useFetch from "../../hooks/Fetch";

function AllItemsPage() {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?f=c";
    const currentData = useRef<string[]>([]);
    const unfilteredData = useRef<string[]>([]);
    let items: any = [];

    const isFilterOpened = useRef<any>();
    const filterBackgroundVisible = useRef<any>();
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [_, rerender] = useReducer((x) => x + 1, 0);
    const filterInput = useRef<any>();
    const page = useRef<number>(1);
    const pageCount = useRef<number>(1);

    const isFilteredByTag = useRef<boolean>(false);
    const isFilteredByArea = useRef<boolean>(false);
    const isFilteredByCategory = useRef<boolean>(false);
    const filterName = useRef<string>("");

    useFetch(url).then((response) => {
        if (response !== undefined) {
            unfilteredData.current = response;
            currentData.current = unfilteredData.current;
        } else {
            console.log("NETWORK ERROR");
        }
        console.log(unfilteredData);
    });

    if (isFiltered) {
        if (isFilteredByTag.current) {
            isFilteredByTag.current = false;
            currentData.current = unfilteredData.current.filter((x: any) =>
                x.strTags?.toLowerCase().includes(filterName.current.toLowerCase())
            );
            filterInput.current.value = "";
        } else if (isFilteredByArea.current) {
            isFilteredByArea.current = false;
            currentData.current = unfilteredData.current.filter((x: any) =>
                x.strArea.toLowerCase().includes(filterName.current.toLowerCase())
            );
            filterInput.current.value = "";
        } else if (isFilteredByCategory.current) {
            isFilteredByCategory.current = false;
            currentData.current = unfilteredData.current.filter((x: any) =>
                x.strCategory.toLowerCase().includes(filterName.current.toLowerCase())
            );
            filterInput.current.value = "";
        } else if (filterInput.current.value) {
            currentData.current = unfilteredData.current.filter((x: any) =>
                x.strMeal.toLowerCase().includes(filterInput.current.value.toLowerCase())
            );
            filterName.current = "";
        }
        page.current = 1;
    }

    items = usePagination(currentData.current);

    pageCount.current = Math.ceil(currentData.current.length / 9);

    function handleChange(event: React.ChangeEvent<unknown>, value: number) {
        page.current = value;
        items.jump(value);
    }

    function onClickFilterItem(filterCategory: string, filterItem: string) {
        switch (filterCategory) {
            case "Tags":
                filterName.current = filterItem;
                isFilteredByTag.current = true;
                break;
            case "Area":
                filterName.current = filterItem;
                isFilteredByArea.current = true;
                break;
            case "Category":
                filterName.current = filterItem;
                isFilteredByCategory.current = true;
                break;
            default:
                console.log("No filterItem");
        }

        toogleFilterBar();

        if (!isFiltered) {
            setIsFiltered(true);
        } else {
            rerender();
        }
    }

    function onPressEnter(event: any): void {
        if (event.key === "Enter") {
            if (filterInput.current.value) {
                if (!isFiltered) {
                    setIsFiltered(true);
                } else {
                    rerender();
                }
            } else {
                setIsFiltered(false);
            }
        }
    }

    function toogleFilterBar() {
        if (window.innerWidth < 1200 && window.innerWidth > 575) {
            filterBackgroundVisible.current.style.right = isFilterOpened.current.style.right === "100%" ? "0px" : "100%";

            isFilterOpened.current.style.right = isFilterOpened.current.style.right === "100%" ? "calc(100vw - 400px)" : "100%";
        } else if (window.innerWidth < 575) {
            filterBackgroundVisible.current.style.right = isFilterOpened.current.style.right === "100%" ? "0px" : "100%";

            isFilterOpened.current.style.right = isFilterOpened.current.style.right === "100%" ? "calc(100vw - 300px)" : "100%";
        }
    }

    return (
        <div className="wrapper">
            <h1 className="main-header">All Recipes</h1>
            <button
                className="filterbar-button"
                onClick={() => {
                    toogleFilterBar();
                }}
            ></button>
            {(unfilteredData.current[0] && (
                <div className="mainbar">
                    <div
                        className="filterbar-bg"
                        ref={filterBackgroundVisible}
                        style={window.innerHeight < 1200 ? { right: "100%" } : {}}
                        onClick={() => {
                            toogleFilterBar();
                        }}
                    ></div>
                    <div className="filterbar" ref={isFilterOpened} style={window.innerHeight < 1200 ? { right: "100%" } : {}}>
                        <h2>Filter</h2>
                        <div className="search-field">
                            <input className="search-input" ref={filterInput} onKeyDown={(event) => onPressEnter(event)} />
                            <button
                                className="search-button"
                                onClick={() => {
                                    if (filterInput.current.value) {
                                        if (!isFiltered) {
                                            setIsFiltered(true);
                                        } else {
                                            rerender();
                                        }
                                    } else {
                                        setIsFiltered(false);
                                    }
                                    toogleFilterBar();
                                }}
                            />
                        </div>
                        <FilterCategory key={1} name="Category" data={unfilteredData.current} onChange={onClickFilterItem} />
                        <FilterCategory key={2} name="Area" data={unfilteredData.current} onChange={onClickFilterItem} />
                        <FilterCategory key={3} name="Tags" data={unfilteredData.current} onChange={onClickFilterItem} />
                    </div>
                    <div className="items-wrapper">
                        <div className="items-header">
                            {isFiltered && <h2 className="filtered-name">{filterName.current || filterInput.current.value}</h2>}
                        </div>
                        <div className="table">
                            {items.currentData()?.map((item: any) => {
                                return <Item key={item.idMeal} itemInfo={item} />;
                            })}
                        </div>
                        <div className="pagination">
                            <Pagination
                                count={pageCount.current}
                                page={page.current}
                                size={window.innerWidth > 575 ? "large" : "small"}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            )) || <h1>LOADING...</h1>}
        </div>
    );
}

export default AllItemsPage;
