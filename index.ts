// 기본적으론 타입설정을 해주지 않아도, 자동으로 정해줌
let Name: string = "CM";
let age = 29;

let SongAndSinger: { song: string; singer: string } = {
  song: "가시",
  singer: "버즈",
};

let Project: {
  member: string[];
  days: number;
  started: boolean;
} = {
  member: ["kim", "park"],
  days: 30,
  started: true,
};
