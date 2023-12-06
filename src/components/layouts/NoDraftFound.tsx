
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";



export const NoDraftFound = ()=>{
    const { t } = useTranslation();
    const [draftId,setDradftId] = useState<string>('');

    const setDraft =(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setDradftId(event.target.value);
    };
    const findDraft =useCallback(()=>{
        window.location.pathname = `/drafts/${draftId}`;
    },[draftId]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          window.location.pathname = `/drafts/${draftId}`;
        }
      };

    return(
        <React.Fragment>

            <Stack direction={"row"} spacing={2} 
            flexWrap="wrap"
            justifyContent="center"
            alignItems="start"
            sx={{paddingTop:"32px"}}
            
            >
            <TextField id="outlined-basic" 
            label={t("draft-id")} 
            variant="outlined" 
            type={"text"}
            value={draftId}
            onChange={setDraft}
            onKeyDown={handleKeyDown}
            helperText={t("no-draft-msg")}
            />
            <Button 
            variant="contained"
            size="medium"
            sx={{height:'48px'}}
            onClick={findDraft}

            >{t("find-draft")} </Button>

</Stack>


            </React.Fragment>
    )
}