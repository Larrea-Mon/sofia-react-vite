
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import styles from './CustomPopover.module.scss';

export default function CustomPopover(props) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? props.id : undefined;

  // Map placement prop to MUI anchorOrigin/transformOrigin
  const placementMap = {
    top: { anchorOrigin: { vertical: 'top', horizontal: 'center' }, transformOrigin: { vertical: 'bottom', horizontal: 'center' } },
    bottom: { anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, transformOrigin: { vertical: 'top', horizontal: 'center' } },
    left: { anchorOrigin: { vertical: 'center', horizontal: 'left' }, transformOrigin: { vertical: 'center', horizontal: 'right' } },
    right: { anchorOrigin: { vertical: 'center', horizontal: 'right' }, transformOrigin: { vertical: 'center', horizontal: 'left' } },
  };
  const placement = placementMap[props.placement] || placementMap.top;

  return (
    <div className={props.className}>
      <Button
        className={styles.popoverButton}
        variant={props.outline ? 'outlined' : 'contained'}
        color={props.color || 'primary'}
        disabled={props.disabled}
        id={props.id}
        onClick={handleClick}
        type="button"
      >
        {props.btnLabel}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={placement.anchorOrigin}
        transformOrigin={placement.transformOrigin}
        PaperProps={{ className: styles.popoverContent }}
      >
        <div>
          <div className={styles.popoverTitle}>Popover Title</div>
          <div>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</div>
        </div>
      </Popover>
    </div>
  );
}
