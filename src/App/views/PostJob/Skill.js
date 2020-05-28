import React from 'react';
import styles from "./skill.module.scss"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Skill = ({formValues, onChange, techStackElement}) => {
    const experience = [
        {
            id: 1,
            desc: "Nice to have"
        },
        {
            id: 2,
            desc: "Junior"
        },
        {
            id: 3,
            desc: "Regular"
        },
        {
            id: 4,
            desc: "Advanced"
        },
        {
            id: 5,
            desc: "Master",
        }
    ];
    let index;
    const techStack = formValues.techStack.filter((e, i) => {
        if (e.language === techStackElement.language) {
            index = i;
            return true;
        }
        return false;
    })[0];
    const expDesc = experience.filter(e => e.id === techStack.lvl)[0].desc;
    const getSkillLevelUpdate = (lvl) => {
        let updatedTechStack = formValues.techStack.map((e, i) => {
            if (i === index) {
                return {...techStack, lvl: lvl};
            } else {
                return e;
            };
        });
        return updatedTechStack;
    };

    const deleteSkill = formValues.techStack.filter(item => {
        if (item.language !== techStackElement.language){
            return item;
        }
            return false;
    })




    return (
        <div className={styles.skillContainer}>
            <div style={{display: "flex"}}>
                {experience.map((lvl,index) => <span key={index} className={techStack.lvl >= lvl.id ? styles.dotClicked : styles.dot}
                                             onClick={() => onChange(getSkillLevelUpdate(lvl.id))}/>
                )}
                <HighlightOffIcon className={styles.close} onClick={() => {
                    onChange(deleteSkill)
                }}/>
            </div>

            <span className={styles.language}>{techStackElement.language}</span>
            <span className={styles.desc} onClick={() => {
                if (techStack.lvl <= 4) {
                    onChange(getSkillLevelUpdate(techStack.lvl + 1))
                } else {
                    onChange(getSkillLevelUpdate(1))
                }
            }}>{expDesc}</span>

        </div>
    )
}
export default Skill