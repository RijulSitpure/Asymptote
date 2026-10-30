import bisect

class MovieRentingSystem:
    def __init__(self, n: int, entries: list[list[int]]):
        self.price = {}
        self.unrented = {}
        self.rented = []
        for shop, movie, p in entries:
            self.price[(shop, movie)] = p
            if movie not in self.unrented:
                self.unrented[movie] = []
            bisect.insort(self.unrented[movie], (p, shop))

    def search(self, movie: int) -> list[int]:
        if movie not in self.unrented:
            return []
        return [shop for p, shop in self.unrented[movie][:5]]

    def rent(self, shop: int, movie: int) -> None:
        p = self.price[(shop, movie)]
        idx = bisect.bisect_left(self.unrented[movie], (p, shop))
        if idx < len(self.unrented[movie]) and self.unrented[movie][idx] == (p, shop):
            del self.unrented[movie][idx]
        bisect.insort(self.rented, (p, shop, movie))

    def drop(self, shop: int, movie: int) -> None:
        p = self.price[(shop, movie)]
        idx = bisect.bisect_left(self.rented, (p, shop, movie))
        if idx < len(self.rented) and self.rented[idx] == (p, shop, movie):
            del self.rented[idx]
        bisect.insort(self.unrented[movie], (p, shop))

    def report(self) -> list[list[int]]:
        return [[shop, movie] for p, shop, movie in self.rented[:5]]

def test_movie_rental():
    mrs = MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]])
    assert mrs.search(1) == [1, 0, 2]
    mrs.rent(0, 1)
    mrs.rent(1, 2)
    assert mrs.report() == [[0, 1], [1, 2]]
    mrs.drop(1, 2)
    assert mrs.search(2) == [0, 1]
