#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <climits>
#include <algorithm>
#include <set>
using namespace std;

int GetMinimumCost(int N, vector<int> A)
{
    A.insert(A.begin(), 0); // 1-based indexing

    vector<int> dist(N + 1, INT_MAX);
    dist[1] = 0;

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    pq.push({0, 1});

    // Instead of modifying A[j], we track how many times A[j] was incremented
    vector<int> increment_count(N + 1, 0);

    while (!pq.empty())
    {
        int cost = pq.top().first;
        int i = pq.top().second;
        pq.pop();

        if (cost > dist[i])
            continue;

        // Operation 1: move to i+1
        if (i + 1 <= N && dist[i + 1] > cost + 1)
        {
            dist[i + 1] = cost + 1;
            pq.push({dist[i + 1], i + 1});
        }

        // Operation 2: jump to j > i if Aj % Ai == 0
        for (int j = i + 1; j <= N; ++j)
        {
            int actual_Ai = A[i] + increment_count[i];
            int actual_Aj = A[j] + increment_count[j];

            if (actual_Aj % actual_Ai == 0)
            {
                int new_cost = cost + actual_Ai;
                if (dist[j] > new_cost)
                {
                    dist[j] = new_cost;
                    pq.push({new_cost, j});
                    increment_count[j]++; // simulate Aj++
                }
            }
        }
    }

    return dist[N];
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;
    vector<int> A(N);
    for (int i = 0; i < N; ++i)
    {
        cin >> A[i];
    }

    cout << GetMinimumCost(N, A) << endl;
    return 0;
}
