// eslint-disable-next-line @typescript-eslint/no-used-vars

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.log(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};

export default { errorHandler };
