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
osax��        l     ��������  ��  ��        l     ��  ��    y s Instead of calling TMKeyset directly, all calls go through TMKeysetPermissionMediator to mitigate permission bugs.     �   �   I n s t e a d   o f   c a l l i n g   T M K e y s e t   d i r e c t l y ,   a l l   c a l l s   g o   t h r o u g h   T M K e y s e t P e r m i s s i o n M e d i a t o r   t o   m i t i g a t e   p e r m i s s i o n   b u g s .     !   l     �� " #��   " � � 	Specifically, whenever a change is made to the permission-holding application, you need to remove and then re-grant permissions.    # � $ $   	 S p e c i f i c a l l y ,   w h e n e v e r   a   c h a n g e   i s   m a d e   t o   t h e   p e r m i s s i o n - h o l d i n g   a p p l i c a t i o n ,   y o u   n e e d   t o   r e m o v e   a n d   t h e n   r e - g r a n t   p e r m i s s i o n s . !  % & % l     �� ' (��   ' s m 	But, because TMKeysetPermissionMediator does not need to be changed often, this frustration can be avoided.    ( � ) ) �   	 B u t ,   b e c a u s e   T M K e y s e t P e r m i s s i o n M e d i a t o r   d o e s   n o t   n e e d   t o   b e   c h a n g e d   o f t e n ,   t h i s   f r u s t r a t i o n   c a n   b e   a v o i d e d . &  *�� * i     # + , + I      �� -����  0 handlekeyevent HandleKeyEvent -  .�� . o      ���� 0 _key  ��  ��   , k      / /  0 1 0 l     �� 2 3��   2 d ^set TM to load script POSIX file "/Users/gzmyrl/Applescript/TMCommonAppleScript.scpt" as alias    3 � 4 4 � s e t   T M   t o   l o a d   s c r i p t   P O S I X   f i l e   " / U s e r s / g z m y r l / A p p l e s c r i p t / T M C o m m o n A p p l e S c r i p t . s c p t "   a s   a l i a s 1  5 6 5 l     �� 7 8��   7 ^ XTM's easyLaunch("/Users/gzmyrl/Applescript/TMKeysetPermissionMediator.app", _key, false)    8 � 9 9 � T M ' s   e a s y L a u n c h ( " / U s e r s / g z m y r l / A p p l e s c r i p t / T M K e y s e t P e r m i s s i o n M e d i a t o r . a p p " ,   _ k e y ,   f a l s e ) 6  :�� : O      ; < ; I    
�� =���� 0 	launchkey 	LaunchKey =  >�� > o    ���� 0 _key  ��  ��   < m      ? ?                                                                                      @ alis    �  MacintoshHD                �
�BD ����TMKeysetPermissionMediator.app                                 ����ම�        ����  
 cu             Applescript   R/:Users:gzmyrl:Scripts:TMMacros:Local2:Applescript:TMKeysetPermissionMediator.app/  >  T M K e y s e t P e r m i s s i o n M e d i a t o r . a p p    M a c i n t o s h H D  OUsers/gzmyrl/Scripts/TMMacros/Local2/Applescript/TMKeysetPermissionMediator.app   /    ��  ��  ��       �� @ A B��   @ ����
�� 
pimr��  0 handlekeyevent HandleKeyEvent A �� C��  C   D E F D �� ��
�� 
vers��   E �� G��
�� 
cobj G  H H   �� 
�� 
frmk��   F �� I��
�� 
cobj I  J J   ��
�� 
osax��   B �� ,���� K L����  0 handlekeyevent HandleKeyEvent�� �� M��  M  ���� 0 _key  ��   K ���� 0 _key   L  ?���� 0 	launchkey 	LaunchKey�� � *�k+ Uascr  ��ޭ