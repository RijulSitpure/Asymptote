#include <cassert>
#include <vector>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<std::vector<int>> r1 = {{0,1},{1,0},{0,1},{1,2},{2,0},{3,4}};
    assert(sol.maximumRequests(5, r1) == 5);
    std::vector<std::vector<int>> r2 = {{0,0},{1,2},{2,1}};
    assert(sol.maximumRequests(3, r2) == 3);
    std::vector<std::vector<int>> r3 = {{0,3},{3,1},{1,2},{2,0}};
    assert(sol.maximumRequests(4, r3) == 4);
    return 0;
}