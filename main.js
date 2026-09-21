/* Portrait effect: halftone dots in bottle green, with a soft lens that reveals the real photo.
   The halftone brightness grid is precomputed (GRID) so nothing is read from the image at runtime.
   That means it also works when index.html is opened straight from disk. */
(function () {
  var GW = 102, GH = 110;
  var GRID = "09PU1dbW19XPzs7OzMjFxMHAvLjNiTtKS0dfcm9yYkhNTk5PT09PUFFTVFVXWFhYWFhWbHRvcGlKVlhWVFNSU1RUSllXVkBTlY2c3NzZ2NbX19fX1tXV1dXU1NXV1tXU1dXU1dTU09TV1dfX19DQ0M/OzMjGw8HAu8yOOkpMS0hkc3B0Y0dOUE9QUVFUVVdXV1dXWFhYWVhXbnZyc2lMWFpaWVhVU1NVS1VaU1c3ZJaNy+HZ2dfX2NjX1tbV1NTV1tbV1dXV1NTV1NPU09XV1tbY08/R0M7Ny8nHxcLA1JU9TExMTEpndXJ2YkZPUFBSVVZWVldXWFdYWFlZWVhXcXl0dGxKWFpZWVpZWFZVTlBcU1VVM3qPr+Tb2tjY2NjY19fW1tbW1tbW1tXU1NPU1NPT1dXW1tfWz9HRzs7MzMnGxMPMhT9MTExMTUxrdXR6YUdRUlRUVldWV1dYWFhYWVpaWlhYdHt2d21GWFpaWlpZWlpZU09cVVVYSUCMmt3e2trZ2djZ19fX1tfW1dbW1NXU09PU09TT1dbW1tfS0NHPzs7NzcrHw9SHMk5MTE1NTU5wd3d8X0pUVVVWVVdYWFhYWFhXWFlaWVhZdHx5eW5LWlpaWlpZWllaWU9cV1VUVztsk87h29ra29nZ2NbW19bW1dbV1NTU1NPT1NPT1tbW19XS0dHQz87OzMvH1aY2Tk1MTk5PTlFzeXl8Yk5VVVZWVlZZWFhYWFhYWVlaWlhZdnx6em9QWVpaWlpaWlpaWVJeWVRWVktaib7j3Nra29ra2trX19bW1tbV1NTU1NTT09PT1dfX19TT0tLR0M/PzMvSvUxJTkxNTk9QT1R4e3p9YU9UVlZWV1VXWVlZWVhXWFlaWVlZd3x7e3BQWlpaW1pbW1taWlRcX1ZWVk9TdrDj3Nzc3Nvb1sza19jX1tbW1dTU1NPT1NLS19fX1tTU09PR0dDPzs7ObEJQTE5PT1BRUFd8fX19X05TVVhXV1dWWltcXl9fXFpaWlhbeX17fXFPWVpbWlpaW1taWlhXYVhVVk9SZJ7e3d3d3dvjs5Xj19fX1tbV1NTU1NTT09LS19fX1tXV1NLR0tHPz9WPQ1BNTU5PUFFSUFl+f35+XU9VVVdWVlZXV1lYWFlcYWFbWldcenx7fnFQWlpbWlpaWlpZWllTXlpZVk9TWYnX4N3d3d7nj43k19fW1dXV1NTU1NTT0tLS19fX1tbU09PS0dHO1phFTU9PT09RUVFSUF+CgIB+W1FaW1xgWFVYVlhZXFtXVVxgWVdce318fnFRWVpbWlpaWVpZWFpSXVtaWFFTVXLL497f4N/FZHPZ2tbW1dXV1NXU1NPS0tHR1tfX1tfV1NTU0tHUwDxDUU9QUFFSUlNUU2SEgYJ+XE9VVVVaXFpZV1VYXF9ZWFRcXFpgfX18fXFSWVpaWlpaWlpZWFtUXFtZWlJQVl2/5N/c0L2mSYLi2NXW1tXV1NXU09LS0dHR19fY19bW1dXT0tDefjJTT1BRUlJTVFRXVmiGgYV+Wk9WW1tUVFdeV1ZXWVlZWVVZXFpgfX58fnFUWVpaWlpZWlpZWFlVWF1bWlpSVlKy4dDCrq2ylcLa19bW1dbV1dXV1NLS0NDR2NjY2NbW1dXU0te/OkpRUFBRUlNUVVZaVmyHg4Z/Vk9UV1pWVlVaXFdXWFhZV1dZWFdgfXx8fnFWWVpaWVpZWVlYWVhWVl1aWVtWUkqd17+8xtXX2tXW19bW1tbW1tXV1dLR0M/Q2NnZ2djW1dXT0d58NVNQUVJSUlRVV1laVm+JhYd+V1RWVVRWVlhYXVtbXF5ZV1lZWFVifXt7fnBSWVlZWVlZWVlZWFhXV1dVVVhTU0eJ2M7Y3t/e29nY19bW1tbW1dTU1dTS0M/Q2NnZ2dnY1tbV1sxIR1JRUVNSU1RWWltbVnOKhod9VlVbXVxYWFhaWV1eXmNfXV9aWFRff318fW9TWFhYV1hYWFhXV1dXV1dWVllYV0d74d7f3dza2tnY2NjX19fW1dXU1dTS0NDQ2dnY2dnZ19bU3583UlFSUlNTVFVXW1tbVneMiIl8VFNVV1pZVVdZWVpbW1xfYF5fXFdigH17fW5WVldWV1ZWV1ZWVlVWVllaWlpXWUxt393d3Nva2tvZ2NfX1tXU0dDV1tTS0dDP2tnZ2dnY19bU3m0/VFFSU1RVVVVaW1tbV3uMiIt8VFVWVVNUVFlZWVpZW1tZXFxXXVdifnx6fGxYW1dWVldWV1dWVlZVUFBTTUxGSURY193b29nX2NjW1NPT1NHR0c/a2dTS0dDQ2tra2tra19bY0FBKUlJTU1RVVVdaWltbWYCMiYx6UVVZWFhVVFZXU1FSUlVZWVhVVlNif3t6fW1TV1hUUlBOTEtKTE9TWWFtdYGPnai02NjX2dvY2NjX1tfW1tPR08/Z29TS0dDQ2trb3NvZ2dfgrD9TUlNUVFVVVllaWltaW4OMiox5VVpcWlhUU1NTUE9hYVJYWFlVWVNgeXJvcGJKS1JXX2l2go+bq7fDzdXd4eTm5ubj3Nra3N3Z2djX19jY19fU09Db3NXT0dHQ29zc3Nvb29jjgkBUUlNUVFZXV1hZWltbXYaMiox5U1dXWFdTUlFQT1BZV0xLSUpNU1VqhIiTnaSntL/K1t7j5ejo5uXi4N7d3Nvb2tra29ra3NnY2djX19jX19bV1NHc3NXT0tHP3N3d3dzd3NzcZU5UVFRUVldYWVlbW11cYIiKholwRkxKT1JSVVxoeGZlc36JlaSxvsvX3uPo6Ojp6Obk4uDe3dzc3N3d3d3d3N3c29zb2tra2trY2NjY19bV1dTV1NDZ2tXS0dDO3d3e3t7e3eW9SVdXVldXV1ZUUlBPTk9NWIOIjZaMgZemrLbI3OHg7eDd5unr7ezr6efl4+Ti4eDe3d3e3d7e3t7e3t7e3t3c3N3c3Nzb29va29vZ2dnY1tXW19bV1NHY2tTS0NDP3t7f3+Df3eqJOkxISEhMUlhibHiFlaWzyd/n7fDw8Ormy7W6r5il7+nl5OLi4OHh39/g4uPj4+Hh39/f397d3d3d3d3d3t7c3N3d3dzb29vb29va2dfX1tXV1tXU1NHX2tPS0dDQ4eHg4eDh3+eLa4iVpbTF0tzm6ezr5t/VybqsoZSHfHRsaGNiYVWG8+Xi5OTj4+Pj4+Pj4+Pj4uHh4N/e3t7d3N3e3d3d3d3d3Nzc29vb29na29ra2tjX1tbW1dTT09DU29TR0NHP4uLh4N/g4uHf4+Lf2c/Dt6udkYmAd3JubGtramlqbG1ubW1ra2KR8+fj5ePj4+Pj4+Tj4+Pj4uHh4N7e3t3d3d7e3t3e3dzd3d3c29zc29ra29ra2djX1tbW1dPT0s/U2tTS0dDOxr+3s6yimpCLhH96dG9vbm9wcXJzdHN0dHNzcXFycnBwb25ubWOV8+bj5OPj4+Tj4+Ti4+Tj4+Lh4N3e3t7d3t7e3d3e3d3d3d3b3Nzb29rb29ra2dfW19bV09PT0c7U2dTS0dDOhYaIiYZ/end3eXp6enx9fHt6enh3dnV1dXZ1dXV1c3NzcW9ubWOa8+bh5OTk5OTj4+Pj4+Pj4+Lh4N3f3t3d3d7e3t7d3t3d3dzb29va2dna29va2djW1tbU1NTU0s/U2dTR0NDOf4WLj42GgX9/f39/f35+fn5+gICAgX9+fXt7eXd1dHRycW9tbmSh9Obi4+Tk5eTj5OTk5OPj4+Lh4N7e3t7d3d7d3t3d3d3d3dzc3Nzb2tra29ra2djX1tXV1dTU09HU2dTS0dDPdoCIkJCLhoSDhYaHhoWDgYGBgoKEhIGBgYB/f35+gIB+fXt3dmyt9ubk5eXk5eTk5eXl5OTk4+Lh4N7e3t7e3t3d3t3d3d3c3Nzb3Nzc29rb29ra2tjX1tbV1dTT09HU2dTS0dDPanB/ioyFgoGAf4CDg4OEhISEg4SFhISEhYSCgoGCgYKBgIKDhoC39ufl5OTk5eXl5eXk5OTj5OTi4d/e3t3d3d3d3d3d3d3d3dzb29vc3Nvb29rZ2djX1tbV1NTU08/S2dPS0dDOgHFqeYSBf35+fn1+f4CAgYCBgYKEg4WHioyPkpSXmZyeoaOlp5/D9Ojj5uvp5OLj4+Pk4+Pj4+Pi4eDe3t7e3d7e3t7e3d3d3dzc3Nzc3Nvc29nZ2djX19bV1dPT0tDT19TS0dDOoZGAcXN0eHp8foKFiYuOkJSXmJqdn6Kkpaeoqaqqqqurq6qpp53H8ujx5M3R5uvp5ubk4uHi4uPi4eDg397e3t/f39/d3d3d3N3d3d3c2tvb29nZ2tjX1tXV1dXU0tDT1tPS0s/Ow7aor5yIkZaYm52eoaKio6Sko6SkpaWlpaSlpqampqaoqaippJrI++OjfXp+hp2wwb3a7Orn5uDh4uLg4ODf3t/g4N7d3d3d3d3d3d3b2trb29ra2NfW1tbV1dXT0tHS1tLS0s/N09DIzqyUmpqbnp6enqCfn6CgoKGhoqKioqOkpKSmp6eoqqirsaTe1GFCU1A/MCoyPERbb6jTz+ji4OHg4eDg4ODg4d/e3d3d3d3d3d3c3dzb3NvZ19fW1tbV1NPT0dHS1dLS0c/N2dnU1KaRmJmZmpudnp+goaCioaKkpKWmqKmqq6yur7Cwsa2ysruaPS0/QkY/MzAvKCopJjZCR5fo6d7f4eDh4eHh4d/f397d3d3d3d3c3Nza2dnY2NbX1tXV1NTT0M/R1NLS0dDO2d3a2qaTmpudn6CjpaampKKiqamoqKioqKmqqaur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ycXLy8rJ3+i6bpejoaimp6WrqaiH1r6Fj56VlI7Y1n1vQzI2LHitrLK6vb7CycrMzM/V1dHU0M3R0NHOzcvGwLuvppZgIiEtf+ve393c29ra2dnZ2NjY19jX1tbW1tTT0tLR0dDPxsXMzczK4Oqwb6Ksrq2irq+vnZWE2sGPobCrmpXa0npcNjsyPI6rsMG+ta2vsLC5vr/Jzs/R1tPQycbBvLe3uLy5q6KOQCwtiOve397c3Nva2dna2NjY2NjW1dbX19XU09PS0dHRyMPLzMzI4e2dWoB9enx8fHt0a2SA4ci/wcDFxcbdz4NrRDw1RZivup57dm5oaWdsiKKwusLExce9sqaDdHN9jpytp6OTRTU2heze3t3c3Nra2tra2djX19XX1tbW19XU09PR0M/Rx8bOzMzJ4+ixjJeanqOorrK4vsHL3d7d3+Dg3t7c2NbPlkw2VaW0f0s/OjgwLzlCU3+irK6rtrKspIBgTkQ8QFVuk6qVSDo3ne7e393c3dva2tra2dfX1tHV19bW1tbU09PT0c/QyMbKycnI5eTV2d3g4eLj4+Tj4eDe2trb29vc29ra293ZrUk1c618RVZgWVhUS0xXZnuTo6Ogr7KvnIBqU0NAOTlFXpmkUzNHvevg397e3dzb2tra2NjX1NLS1tfW1tbT0tLS0tDPysXFxcXE5eTOztLU1tbX19jZ2dnZ2dra2tvb2tra2dnejD86k5hSZH6GhIF9c2VgZnSKnKSoqaqfjXVqXmNvdmxYTWOiZSxz6eTh3t7e3dzb2tra2dnZ1NHU19fX1tXU09LR0dDQy8bGx8fF5OLKzdHS1NXV1dfX19ja2tra2tra2dna2tfkmTlLpHJqg3NiZXFyamZhXGF4kJymo5eIcl9bZXWEhYF6a1eHeiaO7eHg3d3d3Nzc2tra2djZ1tTU1tnY19XV1dPR0dHQzMrJycjG49/Q1dfa29zc3d7g3+Dc2trZ2djY2dna3N/Rejhtq3F2ZU5ng5WVdF5dXmdzjqi3rYtsW1NZYHBza2JqcWJ1gy2m7uLg3d3c3Nza2tra2tnY1tPU1djY1tTV1NTS09LSzcvKycnK5Nm1uLi4ubi3t7e2tK7L3dra2dnZ2dndy7xzSUSSpndiSVxmUj8+T1pUXWyHn8TSwYxhUExLWXmHhm9OWWFxkDmz7eHg3t/e3Nva2tra2dnY1dXT1NfX1tbW1dXS09LRzMnJy8zM5clTUFBRUExNUE5JSk264dnZ2dnZ29rewI1gXmGumHpiXE5cXyYlX3lYbYGYscjOyZx2XEhVTCUvSWBVQ1dznEyP7OHg3dzc29va2dra2djZ1dPT1tjX19bW1NTS0tHQy8XDxcnL5sBOU1RNUGtrTlJyblPF39nZ2dnZ2trew5F+jpGxoJmWinyBfWxxfHt+ipmntMrQya2VgHWAdUE2YVVMTll2omlR1Obf3tzb2tva2tnZ2dfX1NHQ0tXW1dTV1NTS0tHSzsXFx8nI57dTZmVOW3dnTV+Yg1jN3NjZ2dna2tvevZOJk6Kyra+ooI18cm1qcYSbrK+rvc/SzbWqoI52dHl1gnt4h42OoIBPuOrf4d/c29nZ2NjY1tbW09DP0dXW1NTV1NPT09HSzsXGx8jI6a1PamVLW2ZUTF9wWl/T29jY2drb2tvdtY6SmKm1srWzr6ukmpWer7zCvrWxvs7TyLm3urGfgm1qb3eLoKuko4tWquvf4eHe3dva2djY19fU0tHQ0NXW1NTU1NPR1NPSz8XGxcrK6qFKb2ZLV3BcSl14W2TX2djY2dra2tvdrIqamqq2ur+/uba4vcLLy8q/trW3v8vQw7u8vsLFu66joKmyt7mvo5Nkvurg4ODc3Nzb29nX1tfU0tHR0NTV1NTW1tTQ0s3PzMPFxMrM6pNIZ1xLWHdfS1x4Vm3b2NjX2dra2tvdpXiekaq6vr6/wsTGzdLTzrmYo7K8xs7QyMG2sbzKzMa+vLq7wMO5qZZ41+bf39/d3Nvb29rX19bU0tDP0NPV1dbW19bS0MrMzMLDxMbI6IdHXVRLWW9VTF91Tnbe19nX09LW29van2ackau5vcPGxsvT19XKuZKRs7jDy87Qzcm3rKK4zdHPy8XFxcK6sZKN5OHg3t7c29vb29rY1tbV0tDP0NPV1NbZ2NPRz8vMzMHCxMLF5npGVU9MVVhOTVdfSoDg19nXz8rU3NzYmGOfh6y6wMPEwcfLysKzl3itxsDE0NrV08/HxaGRvsrOzM7OzMe7so+l7ODf3d7b2tvb2trY1dfU0dHQ0dPV1NPT1dHR0NDPysHDw8LD4W1CS0xNUFRPTVFVR4ri2Nna2tra293VkWKmj6m8v7y2t7u2r52Ce4alr6WmvMXHw7S6zLKCpLW9wcXGwsK/s4zC7+Lf3d3b2trZ2dnX19fV0M/Q0dTV09LR09PR0NDPy8HEwcDA3mRDSUtLW3dTS2h3SZHi2dva2tvb2t3TimSbjKaysq+trq+onYNriJdvX05khpKXgmx0iYp/ipypsLW2tLa2q5PY6uHe3d3b2trY2NjX1dfVz8/O0NPU09HU1NHQz9DPysDCwsTC1ltHUE1KXHBRS2xyRpri2Nva29vc3N3RhWKkj6GpoJ6enZ6Yi2x6m5tsQz5EW2hfRjs0S3GKeICVoKaopqWloI7b6eDe3N3d3d3c29rY2NfV0NDOz9HU09LT0dDRz87Py8HCxMfEzVFPWU1KXGdNS3BlQ6Pi2Nva293e3N7Qf3KxhpiblpKRkpCHa2KPlZ+KYVROTlBNUE5RaHyUhWh7jJSZmZmVkoLf7ODc29zc3Nva29va2trX0c/Oz9LU1NPT0tDS0M7PysLDxcTDxUtUWUpLW1xLTGVZRavg2dvb3N7e3eDPeH+ycYmLiISDhH5qU3yNhoJtaGdRQUBCSlpufpKUjGpUc4SJi4uIhnrB1t7l6eTc2tvb2tvZ19rY083M0NLU1NPT0tDQz87Qy8DDxcbEt0haXkpLYGNKTGZdR7Pg2dvc3N3d3eHNdYGxb32Ce3l2cWNPX2FecXl4fX6Ig2VaZW5pboaKgXBOTGp2d3d5f1opO1Brmcvk4tnY2tvZ2Nra1s/R0dHW1NPR0dDPzs/RzcDCxsfFq0ZcWklKZmZKTHFoTLzf2tze3t3d3uLKcIS3dGl6bXJvZltbSDJPc3B0eX+LmqWYjoV9dX16XkxTTVVlam5xck8YDRoaJz9useLi2djY19na1dDU0c7W1dPR0dDQz8/OzcHCxsfGn0VUTkhLY2tLTIN+TsHe2tzd3d3d3eHFbISrbFt4Z3N3bWtaLyAyPE5gXGFhZmheYF1dXmNlTS88WmRob3BnY0IbDBMZJCMZMHW74t/W19jY1M/R0c/W1dPR0dDQ0NDPzL/BxcXEkUVOR0lNX1tJTnlpUcXc2Nvc3d3d3eHBaYqoeFRoZHd/e3lXM05OM0eFp8e5vo6bf29hVTgkMTQwX3x7fXVaWD0LAwUECRsZICcxasPo39nZ1tLR1NHU1NLS0tHPz9DRzsHBw8TDgD5IR0dKTEpKTVNNWcvc2dzd3d3e3uC+ZGVyZ01XYnOChodnX5OlioCUpsnU797oybSAbFZmeGdGbJKHhnNSSzELAAECAAYPGCEbI0KEzOXa19LS1tPU1dTS0tLPzs7QzsLAxMTDgU9UUlBPTUxKSUhEWtHa2t3d3N7f4OG7YV9mWUdLWWB8iYp1gqGoppuZn6StsKetpaOaj4ygm4lzhZuQhGRLRScJDAgDAgEABRUcIy0nQ6nk1NHS1NLU1tTS09LQ0NDOzMLAxMTEvLS0s7GtqqaenJeTnNLZ2tzc293f4OG1X216Yj1CTlt1fn94iJ2ipqyhm6q6ubi3r6CQjpqcmo2FjJKJdVJAQEouGB4SBAMCAAAIDh8jJjaX49HS1NPX2NXT09TR0dHPzcLAxcTEwsTFy87Nz9DP0dLU1dHY29zc3N3f4OGvXW9fRzg+SFJfam94h5mfm5ydlpGQlpyXj4iKkZaVlYuAg4ByXUM1PUBKJiEdFRAPDAgBAAYXGy84h9jW09fb2djW1NTS0M/NysG/w8PDu73ByMvJy8vMy8zLzdDX3N3c3d7g4d+taldGOkFCQUZMVmZ4hZWdlo2EgXhtaWZlbHB7h4+Rk497dWlTTjMxPTdGTEk+IxoVFBcRBQAFDxYoL3bV19ja2NbV1NLQz83Ly8PAw8PDu7/EycnKy8vLzs3LzM7V3Nzc3d7g4OGfWEc8UlI9NTpFSFhle5OamZSKd2ljXldYYWh0hZKXl4RybFtFOiQ2NTlCSU1PRCMXFBUWEAQAAAAJJC113Nna2dfU0dDPzszJysPBxcPDvMDEycnKy8vLzs7Nzc3U29zd3t3f5NdlQz9cWDYrLi83PUZNbI2dm5eUjISDdmh4g42TlJiagmNaUEM1IR86KzdFR0hHTEImFRIXGAwEAwEFFyotoeLV1tfU09HRzsrIycTBxcPEvL/GycnKysnLy8rMzM7V293e39/e5JRER2JcPC8bMjUkLjRDV3+coJyipKionpSfpaiqp6KQbU5COy0dGCc0JzlGSUpLSk1KOCIYFxYJAwMCCiIvY9zY19nW1NPRzMrIycTCw8TFu7zByMnLx8TKzcrMzM3S2tzd3d3j1lpIY1o/NiYUL1cfHyozP2aSoaersaymm5Gep6KqpppzUz0xKCEWGi0lJDxFSEhLSklIRj8yHhQOBgMCABsyTszd2NjU0dHRzcrIysbCxcbGtrq9wsXIxsrPz8/NzcnM2N/j5+PmpUZhW0M0IxoNQ3RGHxskK0F1lp6cmJOPjYyZnpGRjoFPNywiGBccHy0dLkFGSUlNTkxGQDs6MSIVCAQDAiA+VMfe1tXRztHSzMrJysfDxsfHh42Ni5ikp6uztru+xcvQ3uHOpoSFYlldSTYfExMmW3BuSR4YHylGdYKNi4eRjYeKgX51d1YxJB8VIhwhJCchPENGR0lNTUlHQj88OTk6HQACC0dJZ9ba19XT0M7OzMnFysfCx8fGent6fIyamJqeoKSlq7W3moBqXmVbYGFSQCEHHilAYG1uZ1UsFRwoRFpmdXt7cmppaGdfUzUjGhxISyMjJhwvQEFER0pIRUNERUJDRERDPSs2MUpKpO/f29bU0s/Ny8rKy8fCyMfGc3FxdXl/gYaMkZeioYxpWmpkZUxJalpMOxsWOCxLYWZwaF9YORwZHy5AT1ROS0hJS0Y9LSUhHUlkJiIgHSI9QENERkVCQkRHSElGSUxMS1NQTU1loKDC1t/Z1NHPzMnJzMfCxsfGhIJ/fH+AfoKKhnZmWEtRb2BUSD9La1lFJA4qPC5SYWBsa15YV0csFxEaGxwkIyAgIRsWHSIiPmU0GyIdHDZAQERFQ0NDRkpLS0xOUFJQTExIUmBlVFBeeZfP1tPQzMjJy8fDx8jHhIODhYmMkpB7XU1KTVJsXk1HQTxPZlc+BA0yPC9SY11lamVYU1RRPSsZDQoMDQ0RFBkhKjBFYUcZJB8cLj0+QEJCQENHSktNTk1KSEpLSjZMYGphW1RSXGGX3dLSzsrIy8bEx8fGlJCIh4uPimdKR0pNTmVhTEhCP0NRY1VHEBc2PDBNZF1hZ2ddUU5OTUpDODMxMjM0NDY9R1NeUhsdIh0mPTw9PUBBRUpMTk9MR0ZLS0ItEChWa25hTVFbYGRkrtHT0M7Ky8jFyMfFoaCamJqJYEpGRkpMYWRNR0FARUtPXlVMMx81PDNGZ11eZGZeWFJNSkdGREJBPjk1OEJMVFlWJBglHiA1Oz0+Q0hJS05NSUVCR0g5HgYKL05Xc2RMUF1hUTMslN7Rz83Ly8nGyMfGlpOUlX9rTUVAREpfalFKQj5BSE9PV1ZMOB0yPTVCa2BfYWVlXVtUTUdDQT88ODc9Rk5TVFYuEyIgHCs9QUZJR0ZISkVEQ0RALBEGDyhLUkVjaUhSWVpNQjstd93Rzs7My8jGyMjHkJCRbGNdRT8+R1tmWEpDPj9FTFFOV1hPOhUpPDg7bGliYWNsZ2FbVExJRUNBQUNKTU9UVDQUICMYJT1CREdISkpGRkU8MSYRCBcuO0hMQkpnUElWWE5FUWBobrTV0c3KysfFx8nGj5F3T2xQQDxCU1xdTkQ9PUJKUVBQYV1QQDMnMzs1YnhpamlxcWxiV1FNSEZHSEpOUFFSNxgbIhciQERGSkpFRUVCNRsWLzs3Oz4+PUJDQlBWQlJZUVJPUl5sdXifzNDKy8bEyMjGo5ZUVWZHQD1GUVxYRz46P0VOT1BUZ1lMREUxKDc3Q356cnR1eHZsYVhSTktLTU1PT043GxodGBpAR0hHRkRDOCcVAQEwSFBQRj4/PkBCRFRQSFtbWldWYGZmZmtuj8zQy8nFycnGo3NLVFtDQUJIT1xPPzg4QElQUVJZZ01XXUU/NSw0M1qThIB8fXx1amFaVlNRUU9OSzIdGhkVHz5EQkNCPy4XDBEGAAgwQ0tPSkRBPz8/RllMT15kXlVbX2FjYmRoboy/0cnEyMnHjlpLUlhCQUJHT1dEOTU7RE1QUlReY048SUhIRTgyOC9zopGKhIN7dGxiYVxXU1FMMh8fGx8tQkZARkErDwIZNzcUGCIoPUZOTk1GPz4/S1dGVGBmX1ZYYWFgXl1kbWt1rc3CxcPFd1NJUlVBQkFFUU88NzlASE9QUlVhYE1CHCBFR0I9ODc4h6qXkZGJgHpybmdeXVEzJSYuOkZGQUBCNBQCAipHTkMzNDgsNEFJTU9NRD9BTVRFWGZiWVVaXl5fVVNbX2dmba7KxMbFaFFFS1A+QEBFUUY3NTtFTVJSU1hhXE1EIRsqPkRBPTo5OneioZ+ZkoyEfoF+Yz8zOkFISUVAOzcfCAgGJEVIS0E+Ojo0Lj1HS09ORzw+T1VFV2BWT1VfXV9dT1NbYF5eX3rAx8fGYE1ASE1APjtEUT00OEBJUFJTVVpiWkw/HSQoIzBARERAPTlVepWkpqSim31hRUNKS0lEQDovKhkKFBQiO0RMSUFBPT46LzdESExNQzxBUU5CVlZNTFVeWVpXTVJaW1lgY22ezMXGXEs9Sko9PDlLSjc1O0ZNUVNVWFdhW008Gyk4NygpLzlCRUU+PENXY212Y0VFSkpHQjsxIhULIRgcJC45PkZNR0FBPz49NzZBR0pJQj1EUUtATklHTFZZVFNLS1FaWFheYGp/uszEW0g9TUc7ODxPPjU5QEpPUVNVVVVfV0s4GSxATkw2LiYiKzhBRjsuOkFAQkU/OS4hFhALBwkVKyg2Oj0+Q0hMRUNCPz48Ozc9Q0ZGREBFT0k9SUVCRlNWVU1FSlRVVldWVl9ofrPMWEg9TkI6NkRNODU7RU1PUVVUUlRdVEs0Gi8+S1NRSkZBNS8zP0Y8OTEqIRkXFxgfJiUhJTUyJy5BQ0FBRUpMRkRBQT8/PTk8QUNGRUNGUEY8SEI+RVFUUUNDTlNRU1ZQUVhiZXSuVUU/Tj03NU5GNzg/SlBPUlRSUVVcUkovGzQ+R1FRTkxMTUhIR0NFR0ZFRkRER0lIREFESEcwJDRCQ0FER0pMR0RAQEA/Pz47PUJFREVHUEU9Rz49Rk9SSkBGT1BQU1FMUFhfYmZ5UkNBTjszOU49OTtGT1JRUlNQUFRaUkgpHjlAR09PTU5PTUdEQkE7Ojg+QUA/QD09RklEPz8uJjdDQ0BGSUxMR0Q/Q0JAQkI9OkJGQ0RITkM8Qj0/RktORkJIUFBRVU9JT1lcXmBr";

  var frame = document.getElementById("portrait");
  var photo = document.getElementById("portraitImg");
  var cv = document.getElementById("portraitFx");
  if (!frame || !photo || !cv || !cv.getContext) return;

  var ctx = cv.getContext("2d");
  var srcCv = document.createElement("canvas");
  var lensCv = document.createElement("canvas");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CELL = 8, W = 0, H = 0, dpr = 1;
  var dotColor = "#003223", bgColor = "#D9D0C7";
  var pt = { x: 0, y: 0 }, target = { x: 0, y: 0 };
  var active = false, visible = true, running = false, ready = false;

  var bin = atob(GRID), lumGrid = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) lumGrid[i] = bin.charCodeAt(i);

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    dotColor = (cs.getPropertyValue("--bottle-900") || dotColor).trim();
    bgColor = (cs.getPropertyValue("--bg-sunken") || bgColor).trim();
  }

  // bilinear sample of the precomputed grid, u and v in 0..1
  function lumAt(u, v) {
    var x = Math.min(GW - 1, Math.max(0, u * GW - 0.5));
    var y = Math.min(GH - 1, Math.max(0, v * GH - 0.5));
    var x0 = Math.floor(x), y0 = Math.floor(y);
    var x1 = Math.min(GW - 1, x0 + 1), y1 = Math.min(GH - 1, y0 + 1);
    var fx = x - x0, fy = y - y0;
    var a = lumGrid[y0 * GW + x0], b = lumGrid[y0 * GW + x1];
    var c = lumGrid[y1 * GW + x0], d = lumGrid[y1 * GW + x1];
    return ((a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy) / 255;
  }

  function layout() {
    var r = frame.getBoundingClientRect();
    if (!r.width) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.round(r.width); H = Math.round(r.height);
    cv.width = srcCv.width = lensCv.width = Math.round(W * dpr);
    cv.height = srcCv.height = lensCv.height = Math.round(H * dpr);

    // same cover-fit crop as the precomputed grid (25% bias toward the top)
    var iw = photo.naturalWidth, ih = photo.naturalHeight;
    var k = Math.max(cv.width / iw, cv.height / ih);
    var dw = iw * k, dh = ih * k;
    var s = srcCv.getContext("2d");
    s.clearRect(0, 0, srcCv.width, srcCv.height);
    s.drawImage(photo, (cv.width - dw) / 2, (cv.height - dh) * 0.25, dw, dh);

    if (!active) { target.x = W * 0.47; target.y = H * 0.55; }
    if (!pt.x) { pt.x = target.x; pt.y = target.y; }
    readColors();
  }

  function render() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = bgColor; ctx.fillRect(0, 0, W, H);

    var cols = Math.ceil(W / CELL), rows = Math.ceil(H / CELL);
    ctx.fillStyle = dotColor; ctx.beginPath();
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var x = (c + 0.5) * CELL, y = (r + 0.5) * CELL;
        var l = lumAt(x / W, y / H);
        l = Math.min(1, Math.max(0, (l - 0.5) * 1.3 + 0.5));     // a little extra contrast
        var rad = (1 - l) * CELL * 0.56;
        if (rad < 0.45) continue;
        ctx.moveTo(x + rad, y); ctx.arc(x, y, rad, 0, 6.2832);
      }
    }
    ctx.fill();

    // lens: the real photo, faded out toward the edge
    var R = Math.min(W, H) * (reduced ? 0.46 : 0.36);
    var lc = lensCv.getContext("2d");
    lc.setTransform(1, 0, 0, 1, 0, 0);
    lc.globalCompositeOperation = "source-over";
    lc.clearRect(0, 0, lensCv.width, lensCv.height);
    lc.drawImage(srcCv, 0, 0);
    lc.globalCompositeOperation = "destination-in";
    var px = pt.x * dpr, py = pt.y * dpr;
    var g = lc.createRadialGradient(px, py, R * dpr * 0.55, px, py, R * dpr);
    g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)");
    lc.fillStyle = g; lc.fillRect(0, 0, lensCv.width, lensCv.height);
    ctx.drawImage(lensCv, 0, 0, W, H);
  }

  var t0 = performance.now();
  function loop(now) {
    if (!visible || document.hidden) { running = false; return; }
    if (!active && !reduced) {
      var t = (now - t0) / 1000;
      target.x = W * (0.47 + 0.18 * Math.sin(t * 0.6));
      target.y = H * (0.55 + 0.16 * Math.sin(t * 0.9 + 1));
    }
    pt.x += (target.x - pt.x) * 0.14; pt.y += (target.y - pt.y) * 0.14;
    render();
    requestAnimationFrame(loop);
  }
  function start() { if (!running && ready && !reduced) { running = true; requestAnimationFrame(loop); } }

  function move(e) {
    var r = frame.getBoundingClientRect();
    target.x = e.clientX - r.left; target.y = e.clientY - r.top; active = true;
    if (reduced) { pt.x = target.x; pt.y = target.y; render(); }
  }

  function init() {
    if (!photo.naturalWidth) return;      // image failed: the plain photo stays visible
    ready = true; layout(); render();
    frame.addEventListener("pointermove", move);
    frame.addEventListener("pointerdown", move);
    frame.addEventListener("pointerleave", function () { active = false; });
    if ("ResizeObserver" in window) new ResizeObserver(function () { layout(); render(); }).observe(frame);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(frame);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });
    start();
  }

  if (photo.complete) init(); else photo.addEventListener("load", init);
})();
