import React from 'react';
import { ScoreCatergory } from '../../@types/score.type';

interface GolfScoreProps {
  value: string;
  type: ScoreCatergory;
}

const GolfScoreContainer: React.FC<GolfScoreProps> = ({ value, type }) => {
  const getBorderStyle = () => {
    switch (type) {
      case 'par':
        return { width: '20px', height: '20px', boxSizing: 'border-box' as 'border-box'};
      case 'birdie':
        return { border: '2px solid black', borderRadius: '50%', width: '20px', height: '20px', boxSizing: 'border-box' as 'border-box', padding: '3px' };
      case 'birdiePlus':
        return {
          position: 'relative' as 'relative',
          display: 'inline-block',
          padding: '8px',
          width: '20px',
          height: '20px',
          boxSizing: 'border-box' as 'border-box',
        };
      case 'bogey':
        return { border: '2px solid black', borderRadius: '5px', width: '20px', height: '20px', boxSizing: 'border-box' as 'border-box', padding: '4px' };
      case 'bogeyPlus':
        return {
          position: 'relative' as 'relative',
          display: 'inline-block',
          padding: '8px',
          width: '20px',
          height: '20px',
          boxSizing: 'border-box' as 'border-box',
        };
      default:
        return {};
    }
  };

  const getInnerBorderStyle = () => {
    switch (type) {
      case 'birdiePlus':
      case 'bogeyPlus':
        return {
          position: 'absolute' as 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box' as 'border-box',
        };
      default:
        return {};
    }
  };

  const getCircleStyle = (thickness: string,innerThickness:string) => {
    return {
      position: 'absolute' as 'absolute',
      width: '100%',
      height: '100%',
      border: `1px solid black`,
      borderRadius: '50%',
      boxSizing: 'border-box' as 'border-box',
      top: '0',
      left: '0',
      boxShadow: `0 0 0 ${thickness} white, 0 0 0 calc(${thickness} + 1px) black, 0 0 0 calc(${innerThickness} - 1px) white, 0 0 0 ${innerThickness} black`,
    };
    
  };

  const getSquareStyle = (thickness: string,innerThickness:string) => {
    return {
      position: 'absolute' as 'absolute',
      width: '100%',
      height: '100%',
      border: `1px solid black`,
      borderRadius: '5px',
      boxSizing: 'border-box' as 'border-box',
      top: '0',
      left: '0',
      boxShadow: `0 0 0 ${thickness} white, 0 0 0 calc(${thickness} + 1px) black, 0 0 0 calc(${innerThickness} - 1px) white, 0 0 0 ${innerThickness} black`,
    
    };
  };

  const getNoBoarderStyle = () => {
    return {
      position: 'absolute' as 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
    };
  };


  const getNumberStyle = () => {
    return {
      position: 'relative' as 'relative',
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  return (
    <div style={{ ...getBorderStyle(), margin: '5px' }}>
      {type === 'birdiePlus' || type === 'bogeyPlus' ? (
        <>
          <div style={getInnerBorderStyle()}>
            {type === 'birdiePlus' ? <div style={getCircleStyle('1px', '0.5px')}></div> : null}
            {type === 'bogeyPlus' ? <div style={getSquareStyle('1px', '0.5px')}></div> : null}
          </div>
          <div style={getInnerBorderStyle()}>
            {type === 'birdiePlus' ? <div style={getCircleStyle('1px', '0.5px')}></div> : null}
            {type === 'bogeyPlus' ? <div style={getSquareStyle('1px', '0.5px')}></div> : null}
          </div>
        </>
      ) :  <div style={getInnerBorderStyle()}><div style={getNoBoarderStyle()}/></div>}
      <div style={getNumberStyle()}>{value}</div>
    </div>
  );
};

export default GolfScoreContainer;
