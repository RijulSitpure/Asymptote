DROP TABLE IF EXISTS TeamPoints;
CREATE TABLE TeamPoints (
    team_id INT PRIMARY KEY,
    name VARCHAR(50),
    points INT
);

DROP TABLE IF EXISTS PointsChange;
CREATE TABLE PointsChange (
    team_id INT PRIMARY KEY,
    points_change INT
);
