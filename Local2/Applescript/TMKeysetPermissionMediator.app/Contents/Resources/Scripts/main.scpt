FasdUAS 1.101.10   ��   ��    k             l        	  x     �� 
 ��   
 1      ��
�� 
ascr  �� ��
�� 
minv  m         �    2 . 4��       Yosemite (10.10) or later    	 �   4   Y o s e m i t e   ( 1 0 . 1 0 )   o r   l a t e r      l     ��  ��    � � use framework "Foundation" # A migration is required in order for this script to work with "Foundation", but it's not necessary atm. See more details here: https://latenightsw.com/adding-applescriptobjc-to-existing-scripts/     �  �   u s e   f r a m e w o r k   " F o u n d a t i o n "   #   A   m i g r a t i o n   i s   r e q u i r e d   i n   o r d e r   f o r   t h i s   s c r i p t   t o   w o r k   w i t h   " F o u n d a t i o n " ,   b u t   i t ' s   n o t   n e c e s s a r y   a t m .   S e e   m o r e   d e t a i l s   h e r e :   h t t p s : / / l a t e n i g h t s w . c o m / a d d i n g - a p p l e s c r i p t o b j c - t o - e x i s t i n g - s c r i p t s /      x    �� ����    2  	 ��
�� 
osax��        l     ��������  ��  ��        l     ��������  ��  ��        l     ��  ��    E ? This allows us to only give permissions once for all keybinds.     �     ~   T h i s   a l l o w s   u s   t o   o n l y   g i v e   p e r m i s s i o n s   o n c e   f o r   a l l   k e y b i n d s .   ! " ! l     �� # $��   # i c In order for permissions to be given, this script needs to be an Applet (it needs to end in .app).    $ � % % �   I n   o r d e r   f o r   p e r m i s s i o n s   t o   b e   g i v e n ,   t h i s   s c r i p t   n e e d s   t o   b e   a n   A p p l e t   ( i t   n e e d s   t o   e n d   i n   . a p p ) . "  & ' & l     �� ( )��   ( [ U In order to do that, you must use File -> Export -> File Format: Application -> Save    ) � * * �   I n   o r d e r   t o   d o   t h a t ,   y o u   m u s t   u s e   F i l e   - >   E x p o r t   - >   F i l e   F o r m a t :   A p p l i c a t i o n   - >   S a v e '  + , + i     - . - I     �� /��
�� .aevtoappnull  �   � **** / o      ���� 0 argv  ��   . Q     ' 0 1 2 0 k     3 3  4 5 4 r     6 7 6 I   �� 8��
�� .sysoloadscpt        file 8 c    	 9 : 9 4    �� ;
�� 
psxf ; m     < < � = = � / U s e r s / g z m y r l / S c r i p t s / T M M a c r o s / L o c a l 2 / A p p l e s c r i p t / T M C o m m o n A p p l e S c r i p t . s c p t : m    ��
�� 
alis��   7 o      ���� 0 tm TM 5  > ? > r     @ A @ n    B C B I    �������� $0 geteasylauncharg getEasyLaunchArg��  ��   C o    ���� 0 tm TM A o      ���� 0 _key   ?  D�� D I    �� E���� 0 	launchkey 	LaunchKey E  F�� F o    ���� 0 _key  ��  ��  ��   1 R      �� G��
�� .ascrerr ****      � **** G o      ���� 0 errormessage errorMessage��   2 l  & &�� H I��   H &   no key was given, so just wait.    I � J J @   n o   k e y   w a s   g i v e n ,   s o   j u s t   w a i t . ,  K L K l     ��������  ��  ��   L  M�� M i     N O N I      �� P���� 0 	launchkey 	LaunchKey P  Q�� Q o      ���� 0 arg1  ��  ��   O k      R R  S T S r      U V U I    
�� W��
�� .sysoloadscpt        file W c      X Y X 4     �� Z
�� 
psxf Z m     [ [ � \ \ ~ / U s e r s / g z m y r l / S c r i p t s / T M M a c r o s / L o c a l 2 / A p p l e s c r i p t / T M K e y s e t . s c p t Y m    ��
�� 
alis��   V o      ���� 0 keyset Keyset T  ] ^ ] l   �� _ `��   _ ] Wset Keyset to load script POSIX file "/Users/gzmyrl/Applescript/TMKeyset.scpt" as alias    ` � a a � s e t   K e y s e t   t o   l o a d   s c r i p t   P O S I X   f i l e   " / U s e r s / g z m y r l / A p p l e s c r i p t / T M K e y s e t . s c p t "   a s   a l i a s ^  b c b r     d e d b     f g f b     h i h m     j j � k k B o n   r u n   a r g v 2 
 ( i t e m   1   o f   a r g v 2 ) ' s   i o    ���� 0 arg1   g m     l l � m m  ( ) 
 	 e n d e o      ���� 0 scpt   c  n�� n I   �� o p
�� .sysodsct****        scpt o o    ���� 0 scpt   p �� q��
�� 
plst q J     r r  s�� s o    ���� 0 keyset Keyset��  ��  ��  ��       �� t u v w��   t ������
�� 
pimr
�� .aevtoappnull  �   � ****�� 0 	launchkey 	LaunchKey u �� x��  x   y z y �� ��
�� 
vers��   z �� {��
�� 
cobj {  | |   ��
�� 
osax��   v �� .���� } ~��
�� .aevtoappnull  �   � ****�� 0 argv  ��   } ������ 0 argv  �� 0 errormessage errorMessage ~ 
�� <����������������
�� 
psxf
�� 
alis
�� .sysoloadscpt        file�� 0 tm TM�� $0 geteasylauncharg getEasyLaunchArg�� 0 _key  �� 0 	launchkey 	LaunchKey�� 0 errormessage errorMessage��  �� (  )��/�&j E�O�j+ E�O*�k+ W X  	h w �� O����  ����� 0 	launchkey 	LaunchKey�� �� ���  �  ���� 0 arg1  ��    �������� 0 arg1  �� 0 keyset Keyset�� 0 scpt   � �� [���� j l����
�� 
psxf
�� 
alis
�� .sysoloadscpt        file
�� 
plst
�� .sysodsct****        scpt�� )��/�&j E�O�%�%E�O��kvl ascr  ��ޭ