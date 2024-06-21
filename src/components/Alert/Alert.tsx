import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks';

const Alert: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    const { text } = useAppSelector(state => state.alert);
    return (
        <>
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    width: "70%",
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#49aaffe4',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    zIndex: '1000'
                }}>
                    {text}
                </div>
            )}
        </>
    )
}

export default Alert
