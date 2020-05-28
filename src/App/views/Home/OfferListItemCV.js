import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import DialogContent from "@material-ui/core/DialogContent";
import styles from "./offers.module.scss";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";


const OfferListItemCV = ({setOpen, showCvs, open, title}) => {
    const handleClose = (e) => {
        setOpen(false);
        e.preventDefault();
    };

    return (

        <Dialog onClick={e => {
            e.nativeEvent.stopImmediatePropagation();
            e.stopPropagation();
        }} onClose={handleClose} open={open}>
            <div className={styles.fontTitleDialog}>
            <DialogTitle  style={{padding: "16px 16px 0px 16px"}} id="simple-dialog-title"><IconButton edge="start"
                                                                                                      color="inherit"
                                                                                                      onClick={handleClose}
                                                                                                      aria-label="close">
                <ClearIcon/>
            </IconButton>CV applied for {title}
                <hr/>
            </DialogTitle>
            </div>
            <DialogContent>
                    {showCvs !== undefined ? showCvs.map((application,index) =>
                        <div key={index} className={styles.fontInsideDialog}>
                            <div><span className={styles.spanFont}>Name: </span>{application.name} </div>
                            <div><span className={styles.spanFont}>Email: </span> {application.email} </div>
                            <div><span className={styles.spanFont}>Message:</span> {application.message === undefined ? "No description provided" : application.message}</div>
                            <a className={styles.CVButton}
                                target="_blank" rel="noopener noreferrer"  href={`http://192.168.10.25:7000/upload/${application.file}`}>Show CV</a>
                            <div className={styles.processing}><span className={styles.recruitmentMobile}>Processing data in future
                                recruitment: </span>{application.checkbox ?
                                    <div className={styles.centerIcon}><CheckIcon
                                        style={{fontSize: 17, color: "#47b300"}}/></div> :
                                    <div className={styles.centerIcon}><ClearIcon
                                        style={{fontSize: 17, color: "#FF6347"}}/>
                                    </div>}</div>
                            <hr style={{marginBottom: 8}}/>
                        </div>) : ""}
            </DialogContent>
        </Dialog>
    )
}

export default OfferListItemCV