import * as React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Box,
  Paper,
  Typography
} from '@mui/material';
import type { MissDistance, RelativeVelocity } from '../shared/types';

export type RelativeVelocityUnit = keyof RelativeVelocity;
export type MissDistanceUnit = keyof MissDistance;

const relativeVelocityUnits: RelativeVelocityUnit[] = [
  "kilometers_per_hour",
  "kilometers_per_second",
  "miles_per_hour"
];

const missDistanceUnits: MissDistanceUnit[] = [
  "astronomical",
  "lunar",
  "kilometers",
  "miles"
];

const orbitBodies: string[] = ["Earth", "Mars", "Venus"];

interface CloseApproachDataFormProps {
  handleRelativeVelocity: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMissDistance: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrbitBody: (event: SelectChangeEvent<string | null>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  orbitingBody: string | null;
}

export default function CloseApproachDataForm({
  handleRelativeVelocity,
  handleMissDistance,
  handleOrbitBody,
  handleSubmit,
  orbitingBody
}: CloseApproachDataFormProps) {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <FormControl fullWidth>
          <InputLabel>Orbiting Body</InputLabel>
          <Select
            value={orbitingBody}
            label="Orbiting Body"
            onChange={handleOrbitBody}
            sx={{ mb: 2 }}
          >
            {orbitBodies.map((body) => (
              <MenuItem key={body} value={body}>
                {body}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend" id="relative-velocity-group">
            Relative Velocity Unit
          </FormLabel>
          <RadioGroup
            aria-labelledby="relative-velocity-group"
            name="relative-velocity"
            onChange={handleRelativeVelocity}
            sx={{ flexDirection: 'row', gap: 2 }}
          >
            {relativeVelocityUnits.map((unit) => (
              <FormControlLabel
                key={unit}
                value={unit}
                control={<Radio />}
                label={unit.charAt(0).toUpperCase() + unit.slice(1)}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend" id="miss-distance-group">
            Miss Distance Unit
          </FormLabel>
          <RadioGroup
            aria-labelledby="miss-distance-group"
            name="miss-distance"
            onChange={handleMissDistance}
            sx={{ flexDirection: 'row', gap: 2 }}
          >
            {missDistanceUnits.map((unit) => (
              <FormControlLabel
                key={unit}
                value={unit}
                control={<Radio />}
                label={unit.charAt(0).toUpperCase() + unit.slice(1)}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2, alignSelf: 'flex-start' }}
        >
          Search Close Approach Data
        </Button>
      </Box>
    </Paper>
  );
}