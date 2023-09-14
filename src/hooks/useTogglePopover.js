import { useState } from "react";

const useTogglePopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [param, setParam] = useState();

    const handleClick = (event, value) => {
        setAnchorEl(event.currentTarget);
        setParam(value);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return { anchorEl, handleClose, open, handleClick, param };
};

export default useTogglePopover;