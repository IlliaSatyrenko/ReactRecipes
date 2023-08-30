import styles from "./ItemPage.module.css";

import useFetch from "../../hooks/Fetch";
import { useNavigate, useParams } from "react-router-dom";
import Video from "../../Video";
import { useRef } from "react";

function ItemPage() {
    const navigate = useNavigate();
    const params = useParams();

    const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + params.id;
    const currentData = useRef<any>();

    const measures: string[] = [];
    const ingredients: string[] = [];
    let videoId: string = "";

    useFetch(url).then((response) => {
        if (response !== undefined) {
            currentData.current = response;
            if (currentData.current) {
                currentData.current = currentData.current[0];
            }
        } else {
            console.log("NETWORK ERROR");
        }
    });
    console.log(currentData.current);

    if (currentData.current !== undefined) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = currentData.current.strYoutube?.match(regExp);
        if (match && match[7].length === 11) {
            videoId = match[7];
        }

        for (let i = 1; i < 21; i++) {
            let str = "strIngredient" + i;
            if (!currentData.current[str]) break;
            const fChar = currentData.current[str].charAt(0).toUpperCase();
            const rChars = currentData.current[str].slice(1);
            ingredients.push(fChar + rChars);
        }

        for (let i = 1; i < 21; i++) {
            let str = "strMeasure" + i;
            if (!currentData.current[str]) break;
            const fChar = currentData.current[str].charAt(0).toUpperCase();
            const rChars = currentData.current[str].slice(1);
            measures.push(fChar + rChars);
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <button className={styles.itemButton} onClick={() => navigate("/all-items")}>
                    All items
                </button>

                {(currentData.current && (
                    <>
                        <div className={styles.itemHeader}>
                            <span className={styles.itemCategory}>{currentData.current.strCategory}</span>
                            <h1 className={styles.itemName}>{currentData.current.strMeal}</h1>
                        </div>
                        <div className={styles.itemVideo}>
                            <Video videoId={videoId} />
                        </div>
                        <div className={styles.itemInfo}>
                            {currentData.current.strTags && (
                                <div className={styles.itemTags}>
                                    <h3 className={styles.tagsHeader}>Tags</h3>
                                    <span className={styles.tagsText}>{currentData.current.strTags.replace(/,/g, ", ")}</span>
                                </div>
                            )}
                            {ingredients[0] && (
                                <div className={styles.itemIngredients}>
                                    <h3 className={styles.ingredientsHeader}>Ingredients</h3>
                                    {(window.innerWidth > 575 && (
                                        <>
                                            <div className={styles.ingredientsWrapper}>
                                                {ingredients.map((ingred) => {
                                                    return <span className={styles.itemIngred}>{ingred}:</span>;
                                                })}
                                            </div>
                                            <div className={styles.measuresWrapper}>
                                                {measures.map((meas) => {
                                                    return <span className={styles.itemMeasure}>{meas},</span>;
                                                })}
                                            </div>
                                        </>
                                    )) || (
                                        <div className={styles.ingredientsWrapper}>
                                            {ingredients.map((ingred, index) => {
                                                return <span className={styles.itemIngred}>{ingred}: {measures[index]}</span>;
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={styles.itemInstruction}>
                            <h3 className={styles.instructionHeader}>Instruction</h3>
                            <p className={styles.instructionText}>{currentData.current.strInstructions}</p>
                        </div>
                    </>
                )) || <h1>LOADING...</h1>}
            </div>
        </>
    );
}

export default ItemPage;
