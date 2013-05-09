import audiotools as at
import pocketsphinx as ps
import sphinxbase

hmmd = '/usr/share/pocketsphinx/model/hmm/wsj1'
lmd = '/usr/share/pocketsphinx/model/lm/wsj/wlist5o.3e-7.vp.tg.lm.DMP'
dictd = '/usr/share/pocketsphinx/model/lm/wsj/wlist5o.dic'

fRaw1 = open('../audios/MT1_LS1_LC_Q3.wav', 'rb')

speechRec = ps.Decoder(hmm = hmmd, lm = lmd, dict = dictd)

speechRec.decode_raw(fRaw1)
result = speechRec.get_hyp()

print result[0]
