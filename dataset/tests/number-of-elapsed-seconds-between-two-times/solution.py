def elapsedSeconds(time1: str, time2: str) -> int:
    def to_sec(t: str) -> int:
        h, m, s = map(int, t.split(':'))
        return h * 3600 + m * 60 + s

    s1 = to_sec(time1)
    s2 = to_sec(time2)
    return s2 - s1 if s2 >= s1 else s2 - s1 + 86400