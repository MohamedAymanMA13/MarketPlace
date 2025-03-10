import Slider, { SliderTooltip } from 'rc-slider';

const { createSliderWithTooltip, Handle } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const CustomRange = ({ minPrice, maxPrice, disabledSlider, setPriceRange }) => {
  return (
    <Range
      allowCross={false}
      min={minPrice}
      max={maxPrice}
      step={100}
      tipProps={{ visible: true }}
      trackStyle={[
        {
          backgroundColor: '#5C48C1',
        },
      ]}
      handleStyle={[
        {
          border: '2px solid #5C48C1',
        },
        {
          border: '2px solid #5C48C1',
        },
      ]}
      // FIXME: update below based on the min and max prices
      defaultValue={[10000, 40000]}
      disabled={disabledSlider}
      onChange={e => {
        // console.log(e);
        setPriceRange(e);
      }}
    />
  );
};

export default CustomRange;
