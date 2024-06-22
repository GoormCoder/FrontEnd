export const createSolve = async (questionId: number, solveRequest: { code: string; language: string }): Promise<{ id: number }> => {
    console.log('createSolve 호출됨');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1 });
        }, 1000);
    });
};

export const getSolve = async (solveId: number): Promise<{ solveResult: string }> => {
    console.log('getSolve 호출됨');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ solveResult: 'Correct' });
        }, 1000);
    });
};