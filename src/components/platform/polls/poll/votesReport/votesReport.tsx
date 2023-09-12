import { FC } from "react";
import { Pie } from "react-chartjs-2";
import { CategoryScale, ChartData } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

interface VoteReportProps {
  options: string[];
  votes: Array<{
    option: string;
  }>;
}

const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const VotesReport: FC<VoteReportProps> = ({ options, votes }) => {
  const data = options.map((option) => {
    const voteCount = votes.filter(
      (vote) => vote.option.toLowerCase() === option.toLowerCase()
    ).length;
    return voteCount;
  });
  const voteCount = votes.length;

  const backgroundColors = options.map(() => generateRandomColor());

  const chartData: ChartData<"pie"> = {
    labels: options,
    datasets: [
      {
        label: "Vote Distribution",
        data: data,
        backgroundColor: backgroundColors,
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <div className="w-full h-full md:h-[28rem] md:w-[28rem]">
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Vote Distribution",
              },
            },
          }}
        />
      </div>
      <h3 className="opacity-70">
        <span className="text-2xl lg:text-4xl font-medium">{voteCount}</span>{" "}
        {voteCount === 1 ? "vote" : "votes"}
      </h3>
    </section>
  );
};

export { VotesReport };
