FasdUAS 1.101.10   ��   ��    k             l        	  x     �� 
 ��   
 1      ��
�� 
ascr  �� ��
�� 
minv  m         �    2 . 4��       Yosemite (10.10) or later    	 �   4   Y o s e m i t e   ( 1 0 . 1 0 )   o r   l a t e r      x    �� ����    4   	 �� 
�� 
frmk  m       �    F o u n d a t i o n��        x     �� ����    2   ��
�� 
osax��        l     ��������  ��  ��        l     ��  ��    y s Instead of calling TMKeyset directly, all calls go through TMKeysetPermissionMediator to mitigate permission bugs.     �   �   I n s t e a d   o f   c a l l i n g   T M K e y s e t   d i r e c t l y ,   a l l   c a l l s   g o   t h r o u g h   T M K e y s e t P e r m i s s i o n M e d i a t o r   t o   m i t i g a t e   p e r m i s s i o n   b u g s .     !   l     �� " #��   " � � 	Specifically, whenever a change is made to the permission-holding application, you need to remove and then re-grant permissions.    # � $ $   	 S p e c i f i c a l l y ,   w h e n e v e r   a   c h a n g e   i s   m a d e   t o   t h e   p e r m i s s i o n - h o l d i n g   a p p l i c a t i o n ,   y o u   n e e d   t o   r e m o v e   a n d   t h e n   r e - g r a n t   p e r m i s s i o n s . !  % & % l     �� ' (��   ' s m 	But, because TMKeysetPermissionMediator does not need to be changed often, this frustration can be avoided.    ( � ) ) �   	 B u t ,   b e c a u s e   T M K e y s e t P e r m i s s i o n M e d i a t o r   d o e s   n o t   n e e d   t o   b e   c h a n g e d   o f t e n ,   t h i s   f r u s t r a t i o n   c a n   b e   a v o i d e d . &  *�� * i     # + , + I      �� -����  0 handlekeyevent HandleKeyEvent -  .�� . o      ���� 0 _key  ��  ��   , k      / /  0 1 0 r      2 3 2 I    
�� 4��
�� .sysoloadscpt        file 4 c      5 6 5 4     �� 7
�� 
psxf 7 m     8 8 � 9 9 � / U s e r s / g z m y r l / S c r i p t s / T M M a c r o s / L o c a l 2 / A p p l e s c r i p t / T M C o m m o n A p p l e S c r i p t . s c p t 6 m    ��
�� 
alis��   3 o      ���� 0 tm TM 1  : ; : n    < = < I    �� >���� 0 
easylaunch 
easyLaunch >  ? @ ? m     A A � B B � / U s e r s / g z m y r l / S c r i p t s / T M M a c r o s / L o c a l 2 / A p p l e s c r i p t / T M K e y s e t P e r m i s s i o n M e d i a t o r . a p p @  C D C o    ���� 0 _key   D  E�� E m    ��
�� boovfals��  ��   = o    ���� 0 tm TM ;  F G F l   �� H I��   H 3 -tell application "TMKeysetPermissionMediator"    I � J J Z t e l l   a p p l i c a t i o n   " T M K e y s e t P e r m i s s i o n M e d i a t o r " G  K L K l   �� M N��   M  	LaunchKey(_key)    N � O O   	 L a u n c h K e y ( _ k e y ) L  P�� P l   �� Q R��   Q  end tell    R � S S  e n d   t e l l��  ��       �� T U V��   T ����
�� 
pimr��  0 handlekeyevent HandleKeyEvent U �� W��  W   X Y Z X �� ��
�� 
vers��   Y �� [��
�� 
cobj [  \ \   �� 
�� 
frmk��   Z �� ]��
�� 
cobj ]  ^ ^   ��
�� 
osax��   V �� ,���� _ `����  0 handlekeyevent HandleKeyEvent�� �� a��  a  ���� 0 _key  ��   _ ������ 0 _key  �� 0 tm TM ` �� 8���� A��
�� 
psxf
�� 
alis
�� .sysoloadscpt        file�� 0 
easylaunch 
easyLaunch�� )��/�&j E�O��fm+ OP ascr  ��ޭ