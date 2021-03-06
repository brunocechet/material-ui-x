import * as React from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { darkThemeId, lightThemeId, ThemeContext } from '../../theme';
import { StyledPanels } from './styled-panel';

export interface SettingsPanelProps {
  onApply: (settings: {
    size: number;
    type: string;
    selectedTheme: string;
    pagesize: number;
  }) => void;
  type: string;
  size: number;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onApply, type, size }) => {
  const [sizeState, setSize] = React.useState<number>(size);
  const [typeState, setType] = React.useState<string>(type);
  const currentTheme = React.useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = React.useState<string>(currentTheme.theme);
  const [selectedPaginationValue, setSelectedPaginationValue] = React.useState<number>(-1);

  const applyChanges = React.useCallback(() => {
    onApply({ size: sizeState, type: typeState, selectedTheme, pagesize: selectedPaginationValue });
  }, [sizeState, typeState, selectedTheme, selectedPaginationValue, onApply]);

  const onDatasetChange = React.useCallback(
    (e: React.ChangeEvent<{ name?: string; value: any }>) => {
      setType(e.target.value);
    },
    [setType],
  );

  const onSizeChange = React.useCallback(
    (e: React.ChangeEvent<{ name?: string; value: any }>) => {
      setSize(Number(e.target.value));
    },
    [setSize],
  );
  const onPaginationChange = React.useCallback(
    (e: React.ChangeEvent<{ name?: string; value: any }>) => {
      setSelectedPaginationValue(e.target.value);
      // setSize(Number(e.target.value));
    },
    [setSelectedPaginationValue],
  );
  const onSelectedThemeChange = React.useCallback(
    (e: React.ChangeEvent<{ name?: string; value: any }>) => {
      setSelectedTheme(e.target.value);
    },
    [setSelectedTheme],
  );

  return (
    <StyledPanels>
      {/* <Panel title="Settings"> */}
      <div className="panel">
        <FormGroup row className="center">
          <FormControl className="dataset-control input-text" size="small" component="fieldset">
            <FormLabel component="legend">Dataset</FormLabel>
            <Select value={typeState} onChange={onDatasetChange}>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="commodity">Commodity</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="dataset-control input-text" size="small" component="fieldset">
            <FormLabel component="legend">Rows</FormLabel>
            <Select value={sizeState} onChange={onSizeChange}>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
              <MenuItem value={10000}>{Number(10000).toLocaleString()}</MenuItem>
              <MenuItem value={100000}>{Number(100000).toLocaleString()}</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="dataset-control input-text" size="small" component="fieldset">
            <FormLabel component="legend">Page Size</FormLabel>
            <Select value={selectedPaginationValue} onChange={onPaginationChange}>
              <MenuItem value={-1}>off</MenuItem>
              <MenuItem value={0}>auto</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            className="dataset-control input-text"
            size="small"
            component="fieldset"
            style={{ display: 'none' }}
          >
            <FormLabel component="legend">Themes</FormLabel>
            <Select value={selectedTheme} onChange={onSelectedThemeChange}>
              <MenuItem value={lightThemeId}>Light</MenuItem>
              <MenuItem value={darkThemeId}>Dark</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Button
              size="small"
              className="apply-btn"
              variant="outlined"
              color="primary"
              onClick={applyChanges}
            >
              <KeyboardArrowRightIcon fontSize="small" /> Apply
            </Button>
          </div>
        </FormGroup>
      </div>
    </StyledPanels>
  );
};
