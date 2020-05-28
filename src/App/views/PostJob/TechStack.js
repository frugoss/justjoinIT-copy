import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import Skill from "./Skill";
import LanguageList from "../../assets/LanguageList.json"
import styles from './skill.module.scss'

const filter = createFilterOptions();
const languages = LanguageList;

const TechStack = ({onChange, formValues, fieldRenderProps}) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <>
            <Autocomplete
                disableClearable
                freeSolo
                inputValue={inputValue}
                onInputChange={e => setInputValue(e ? e.target.value || "" : "")}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        onChange([...formValues.techStack, {language: newValue, lvl: 1}])
                    } else if (newValue) {
                        onChange([...formValues.techStack, {...newValue, lvl: 1}])
                    }
                    setInputValue("");
                }}
                filterOptions={(options, params) => {
                    let filtered = filter(options, params);
                    const isAdded = (needle, haystack) => {
                        let exist = false;
                        haystack.forEach(element => {
                            if (needle === element.language) {
                                exist = true;
                            };
                        });
                        return exist;
                    };
                    if (params.inputValue !== "" && !isAdded(params.inputValue, formValues.techStack)) {
                        filtered.push({
                            language: `${params.inputValue}`
                        });
                    };
                    filtered = filtered.filter(item => {
                            let exist = true;
                            formValues.techStack.forEach(element => {
                                    if (item.language === element.language) {
                                        exist = false;
                                    }
                                }
                            );
                            return exist;
                        }
                    );
                    return filtered;
                }}
                id="tech-stack"
                options={languages}
                getOptionLabel={option => {
                    if (typeof option === "string") {
                        return option;
                    } else {
                        return option ? option.language : ""
                    }
                }}
                style={{width: 264}}
                renderInput={params => (
                    <TextField
                        error={fieldRenderProps.meta.error && fieldRenderProps.meta.touched}
                        {...params}
                        placeholder="Select technology or write a new one"
                        label=""
                        variant="standard"
                    />
                )}
            />

            <div/>
            <div className={styles.techStackList}>
                {formValues.techStack !== undefined
                    ? formValues.techStack.map((techStackElement) => (
                        <Skill onChange={onChange} formValues={formValues} key={techStackElement.language}
                               techStackElement={techStackElement}/>
                    ))
                    : ""}
            </div>
        </>
    );
};

export default TechStack;
