import { Box, Divider, Stack, Typography } from '@mui/material';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
const COLORS = [
  '#cea9bc',
  '#8464a0',
  '#323232',
  '#0a417a',
  '#72b4eb',
  '#2085ec',
  '#dc346c',
  '#fcbd9c',
  '#391d9d',
  '#aa579f',
  '#8ea5cc',
  '#4c325c',
  '#04e484',
  '#8164fc',
  '#02824b',
  '#78787a',
  '#aca8c8',
  '#0c0c14',
];

const AdminPieChart = ({ data, index }: { data: any[]; index: number }) => {
  return (
    <Stack id='piechart'>
      <Box display={'flex'} justifyContent={'center'}>
        <ResponsiveContainer width={200} aspect={1}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill='#8884d8'
              paddingAngle={5}
              dataKey='value'
            >
              {data.map((entry, dataIndex) => (
                <Cell
                  key={`cell-${dataIndex}`}
                  fill={COLORS[(dataIndex * data.length + index) % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip></Tooltip>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box>
        <Stack>
          {(() => {
            return data.map((entry, dataIndex) => {
              return (
                <Box key={dataIndex}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    padding={1}
                  >
                    <Box display={'flex'} justifyContent={'start'} alignItems={'center'}>
                      <Box
                        width={20}
                        height={20}
                        borderRadius={2}
                        bgcolor={COLORS[(dataIndex * data.length + index) % COLORS.length]}
                      ></Box>
                      <Typography variant='body1' fontWeight={'bold'} color='black' ml={1}>
                        {entry.name}
                      </Typography>
                    </Box>
                    <Typography variant='body1' fontWeight={'bold'} color='black'>
                      {entry.value}
                    </Typography>
                  </Box>
                  {dataIndex !== data.length - 1 && <Divider />}
                </Box>
              );
            });
          })()}
        </Stack>
      </Box>
    </Stack>
  );
};

export default AdminPieChart;
